import type { Track, Device } from '@/pages/episode/types';
import { refreshAccessToken } from '@/utils/spotify';

// 캐시 관련 타입 정의
interface CacheItem {
  data: any;
  timestamp: number;
  expiresAt: number;
}

interface SpotifyCache {
  [key: string]: CacheItem;
}

// 캐시 설정
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24시간 (밀리초)
const CACHE_KEY = 'spotify_track_cache';

// 캐시 유틸리티 함수들
const generateCacheKey = (query: string): string => {
  return `spotify_search_${encodeURIComponent(query)}`;
};

const getCache = (): SpotifyCache => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch (error) {
    console.error('캐시 읽기 오류:', error);
    return {};
  }
};

const setCache = (cache: SpotifyCache): void => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('캐시 저장 오류:', error);
  }
};

const getCachedData = (query: string): any | null => {
  const cache = getCache();
  const key = generateCacheKey(query);
  const item = cache[key];
  
  if (!item) return null;
  
  // 캐시 만료 확인
  if (Date.now() > item.expiresAt) {
    delete cache[key];
    setCache(cache);
    return null;
  }
  
  return item.data;
};

const setCachedData = (query: string, data: any): void => {
  const cache = getCache();
  const key = generateCacheKey(query);
  
  cache[key] = {
    data,
    timestamp: Date.now(),
    expiresAt: Date.now() + CACHE_DURATION
  };
  
  setCache(cache);
};

// 캐시 정리 함수 (만료된 항목들 제거)
const cleanupCache = (): void => {
  const cache = getCache();
  const now = Date.now();
  let hasChanges = false;
  
  Object.keys(cache).forEach(key => {
    if (now > cache[key].expiresAt) {
      delete cache[key];
      hasChanges = true;
    }
  });
  
  if (hasChanges) {
    setCache(cache);
  }
};

// Spotify API 요청을 위한 헬퍼 함수
const makeSpotifyRequest = async (url: string, token: string, retryCount: number = 0): Promise<Response> => {
  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 5000;
    console.warn(`Rate limited. Waiting ${waitTime}ms before retry. (Attempt ${retryCount + 1})`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
    if (retryCount < 3) {
      return makeSpotifyRequest(url, token, retryCount + 1);
    }
  }

  return response;
};

// Spotify API PUT 요청을 위한 헬퍼 함수
const makeSpotifyPutRequest = async (url: string, token: string, body?: any, retryCount: number = 0): Promise<Response> => {
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  
  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 1000;
    console.log(`Rate limited. Waiting ${waitTime}ms before retry. (Attempt ${retryCount + 1})`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
    
    if (retryCount < 2) {
      return makeSpotifyPutRequest(url, token, body, retryCount + 1);
    }
  }
  
  return response;
};

// 캐시된 Spotify 검색 함수
const searchSpotifyWithCache = async (query: string, token: string): Promise<any | null> => {
  // 캐시 정리
  cleanupCache();
  
  // 캐시에서 먼저 확인
  const cachedData = getCachedData(query);
  if (cachedData) {
    console.log('캐시에서 트랙 정보를 찾았습니다:', query);
    return cachedData;
  }
  
  // 캐시에 없으면 API 호출
  console.log('Spotify API에서 트랙을 검색합니다:', query);
  try {
    const response = await makeSpotifyRequest(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
      token
    );
    
    if (response.status === 401) {
      const newToken = await refreshAccessToken();
      if (!newToken) return null;
      
      const retryResponse = await makeSpotifyRequest(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
        newToken
      );
      
      if (retryResponse.ok) {
        const data = await retryResponse.json();
        if (data.tracks.items.length > 0) {
          setCachedData(query, data.tracks.items[0]);
          return data.tracks.items[0];
        }
      }
      return null;
    }
    
    if (response.ok) {
      const data = await response.json();
      if (data.tracks.items.length > 0) {
        setCachedData(query, data.tracks.items[0]);
        return data.tracks.items[0];
      }
    }
    
    return null;
  } catch (error) {
    console.error('Spotify 검색 오류:', error);
    return null;
  }
};

// Spotify 관련 커스텀 훅
const useSpotify = () => {
  // 트랙 검색 (여러 트랙) - 캐싱 적용
  const searchTracks = async (
    items: { title: string; artist: string; image?: string; [key: string]: any }[],
    setItems: (items: any[]) => void,
    getQuery: (item: any) => string,
    updateItem: (item: any, spotifyTrack: any) => any
  ) => {
    let token = localStorage.getItem('spotify_access_token');
    if (!token) {
      console.log('No Spotify token found');
      return;
    }
  
    const updatedItems = [];
    for (const item of items) {
      try {
        const query = getQuery(item);
        const spotifyTrack = await searchSpotifyWithCache(query, token);
        
        if (spotifyTrack) {
          updatedItems.push(updateItem(item, spotifyTrack));
        } else {
          updatedItems.push(item);
        }
      } catch (error) {
        console.error('Error searching track:', error);
        updatedItems.push(item);
      }
    }
    setItems(updatedItems);
  };

  // 트랙 재생/토글
  const handleTrackClick = async (
    track: Track,
    currentTrack: string | null,
    setCurrentTrack: (track: string | null) => void,
    isPlaying: boolean,
    setIsPlaying: (isPlaying: boolean) => void
  ) => {
    if (!track.spotifyUri) {
      return;
    }
    let token = localStorage.getItem('spotify_access_token');
    if (!token) {
      return;
    }
    
    try {
      let devicesResponse = await makeSpotifyRequest(
        'https://api.spotify.com/v1/me/player/devices',
        token
      );
      
      if (devicesResponse.status === 401) {
        token = await refreshAccessToken();
        if (!token) return;
        devicesResponse = await makeSpotifyRequest(
          'https://api.spotify.com/v1/me/player/devices',
          token
        );
      }
      
      const devicesData = await devicesResponse.json();
      let activeDevice = devicesData.devices.find((device: Device) => device.is_active);
      if (!activeDevice && devicesData.devices.length > 0) {
        activeDevice = devicesData.devices[0];
        await makeSpotifyPutRequest(`https://api.spotify.com/v1/me/player`, token, {
          device_ids: [activeDevice.id],
          play: false
        });
      }
      if (!activeDevice) {
        return;
      }
      
      if (currentTrack === track.spotifyUri) {
        const action = isPlaying ? 'pause' : 'play';
        let playResponse = await makeSpotifyPutRequest(
          `https://api.spotify.com/v1/me/player/${action}?device_id=${activeDevice.id}`,
          token
        );
        
        if (playResponse.status === 401) {
          token = await refreshAccessToken();
          if (!token) return;
          playResponse = await makeSpotifyPutRequest(
            `https://api.spotify.com/v1/me/player/${action}?device_id=${activeDevice.id}`,
            token
          );
        }
        if (playResponse.ok) {
          setIsPlaying(!isPlaying);
        }
      } else {
        let playResponse = await makeSpotifyPutRequest(
          `https://api.spotify.com/v1/me/player/play?device_id=${activeDevice.id}`,
          token,
          {
            uris: [track.spotifyUri]
          }
        );
        
        if (playResponse.status === 401) {
          token = await refreshAccessToken();
          if (!token) return;
          playResponse = await makeSpotifyPutRequest(
            `https://api.spotify.com/v1/me/player/play?device_id=${activeDevice.id}`,
            token,
            {
              uris: [track.spotifyUri]
            }
          );
        }
        if (playResponse.ok) {
          setCurrentTrack(track.spotifyUri);
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Error handling track click:', error);
    }
  };

  // 단일 음악 검색 및 재생 - 캐싱 적용
  const handleMusicClick = async (
    title: string,
    artist: string,
    currentTrack: string | null,
    setCurrentTrack: (track: string | null) => void,
    isPlaying: boolean,
    setIsPlaying: (isPlaying: boolean) => void
  ): Promise<{ spotifyUri: string; imageUrl: string } | null> => {
    let token = localStorage.getItem('spotify_access_token');
    if (!token) {
      console.log('No Spotify token found');
      return null;
    }
    
    try {
      // 캐시된 검색 사용
      const query = `${title} ${artist}`;
      const spotifyTrack = await searchSpotifyWithCache(query, token);
      
      if (!spotifyTrack) {
        console.log('No track found for:', query);
        return null;
      }
      
      const spotifyUri = spotifyTrack.uri;
      const imageUrl = spotifyTrack.album.images[0]?.url || '/assets/images/spotifyLoading.jpg';
      
      // 현재 재생 중인 트랙과 같은지 확인
      if (currentTrack === spotifyUri) {
        // 같은 트랙이면 재생/일시정지 토글
        let devicesResponse = await makeSpotifyRequest(
          'https://api.spotify.com/v1/me/player/devices',
          token
        );
        
        if (devicesResponse.status === 401) {
          token = await refreshAccessToken();
          if (!token) return null;
          devicesResponse = await makeSpotifyRequest(
            'https://api.spotify.com/v1/me/player/devices',
            token
          );
        }
        
        const devicesData = await devicesResponse.json();
        let activeDevice = devicesData.devices.find((device: Device) => device.is_active);
        if (!activeDevice && devicesData.devices.length > 0) {
          activeDevice = devicesData.devices[0];
        }
        if (!activeDevice) {
          console.log('No active device found');
          return null;
        }
        
        const action = isPlaying ? 'pause' : 'play';
        let playResponse = await makeSpotifyPutRequest(
          `https://api.spotify.com/v1/me/player/${action}?device_id=${activeDevice.id}`,
          token
        );
        
        if (playResponse.status === 401) {
          token = await refreshAccessToken();
          if (!token) return null;
          playResponse = await makeSpotifyPutRequest(
            `https://api.spotify.com/v1/me/player/${action}?device_id=${activeDevice.id}`,
            token
          );
        }
        
        if (playResponse.ok) {
          setIsPlaying(!isPlaying);
        }
        return { spotifyUri, imageUrl };
      } else {
        // 새로운 트랙 재생
        let devicesResponse = await makeSpotifyRequest(
          'https://api.spotify.com/v1/me/player/devices',
          token
        );
        
        if (devicesResponse.status === 401) {
          token = await refreshAccessToken();
          if (!token) return null;
          devicesResponse = await makeSpotifyRequest(
            'https://api.spotify.com/v1/me/player/devices',
            token
          );
        }
        
        const devicesData = await devicesResponse.json();
        let activeDevice = devicesData.devices.find((device: Device) => device.is_active);
        if (!activeDevice && devicesData.devices.length > 0) {
          activeDevice = devicesData.devices[0];
          await makeSpotifyPutRequest(`https://api.spotify.com/v1/me/player`, token, {
            device_ids: [activeDevice.id],
            play: false
          });
        }
        if (!activeDevice) {
          console.log('No active device found');
          return null;
        }
        
        let playResponse = await makeSpotifyPutRequest(
          `https://api.spotify.com/v1/me/player/play?device_id=${activeDevice.id}`,
          token,
          {
            uris: [spotifyUri]
          }
        );
        
        if (playResponse.status === 401) {
          token = await refreshAccessToken();
          if (!token) return null;
          playResponse = await makeSpotifyPutRequest(
            `https://api.spotify.com/v1/me/player/play?device_id=${activeDevice.id}`,
            token,
            {
              uris: [spotifyUri]
            }
          );
        }
        
        if (playResponse.ok) {
          setCurrentTrack(spotifyUri);
          setIsPlaying(true);
        }
        return { spotifyUri, imageUrl };
      }
    } catch (error) {
      console.error('Error handling music click:', error);
      return null;
    }
  };

  // Spotify에서 트랙 정보만 검색 (재생하지 않음) - 캐싱 적용
  const fetchSpotifyTrackInfo = async (title: string, artist: string): Promise<{ spotifyUri: string; imageUrl: string } | null> => {
    let token = localStorage.getItem('spotify_access_token');
    if (!token) {
      console.log('No Spotify token found');
      return null;
    }
    
    try {
      const query = `${title} ${artist}`;
      const spotifyTrack = await searchSpotifyWithCache(query, token);
      
      if (!spotifyTrack) {
        console.log('No track found for:', query);
        return null;
      }
      
      const spotifyUri = spotifyTrack.uri;
      const imageUrl = spotifyTrack.album.images[0]?.url || '/assets/images/spotifyLoading.jpg';
      
      return { spotifyUri, imageUrl };
    } catch (error) {
      console.error('Error fetching track info:', error);
      return null;
    }
  };

  // 캐시 관리 함수들
  const clearCache = (): void => {
    localStorage.removeItem(CACHE_KEY);
    console.log('Spotify 캐시가 삭제되었습니다.');
  };

  const getCacheStats = (): { total: number; expired: number; valid: number } => {
    const cache = getCache();
    const now = Date.now();
    let expired = 0;
    let valid = 0;
    
    Object.values(cache).forEach(item => {
      if (now > item.expiresAt) {
        expired++;
      } else {
        valid++;
      }
    });
    
    return {
      total: Object.keys(cache).length,
      expired,
      valid
    };
  };

  return {
    refreshAccessToken,
    searchTracks,
    handleTrackClick,
    handleMusicClick,
    fetchSpotifyTrackInfo,
    clearCache,
    getCacheStats
  };
};

export default useSpotify;