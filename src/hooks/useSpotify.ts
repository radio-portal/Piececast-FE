import type { Track, Device } from '@/pages/episode/types';
import { refreshAccessToken } from '@/utils/spotify';

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

// Spotify 관련 커스텀 훅
const useSpotify = () => {
  // 트랙 검색 (여러 트랙)
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
        let response = await makeSpotifyRequest(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
          token!
        );
  
        // 401 처리 (액세스 토큰 만료)
        if (response.status === 401) {
          token = await refreshAccessToken();
          if (!token) {
            updatedItems.push(item);
            continue;
          }
          response = await makeSpotifyRequest(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
            token
          );
        }
  
        if (response.ok) {
          const data = await response.json();
          if (data.tracks.items.length > 0) {
            const spotifyTrack = data.tracks.items[0];
            updatedItems.push(updateItem(item, spotifyTrack));
          } else {
            updatedItems.push(item);
          }
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

  // 단일 음악 검색 및 재생
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
      // 먼저 Spotify에서 음악 검색
      const query = `${title} ${artist}`;
      let searchResponse = await makeSpotifyRequest(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
        token
      );
      
      if (searchResponse.status === 401) {
        token = await refreshAccessToken();
        if (!token) return null;
        searchResponse = await makeSpotifyRequest(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
          token
        );
      }
      
      if (!searchResponse.ok) {
        console.error('Failed to search track');
        return null;
      }
      
      const searchData = await searchResponse.json();
      if (searchData.tracks.items.length === 0) {
        console.log('No track found for:', query);
        return null;
      }
      
      const spotifyTrack = searchData.tracks.items[0];
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

  // Spotify에서 트랙 정보만 검색 (재생하지 않음)
  const fetchSpotifyTrackInfo = async (title: string, artist: string): Promise<{ spotifyUri: string; imageUrl: string } | null> => {
    let token = localStorage.getItem('spotify_access_token');
    if (!token) {
      console.log('No Spotify token found');
      return null;
    }
    
    try {
      const query = `${title} ${artist}`;
      let searchResponse = await makeSpotifyRequest(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
        token
      );
      
      if (searchResponse.status === 401) {
        token = await refreshAccessToken();
        if (!token) return null;
        searchResponse = await makeSpotifyRequest(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
          token
        );
      }
      
      if (!searchResponse.ok) {
        console.error('Failed to search track');
        return null;
      }
      
      const searchData = await searchResponse.json();
      if (searchData.tracks.items.length === 0) {
        console.log('No track found for:', query);
        return null;
      }
      
      const spotifyTrack = searchData.tracks.items[0];
      const spotifyUri = spotifyTrack.uri;
      const imageUrl = spotifyTrack.album.images[0]?.url || '/assets/images/spotifyLoading.jpg';
      
      return { spotifyUri, imageUrl };
    } catch (error) {
      console.error('Error fetching track info:', error);
      return null;
    }
  };

  return {
    refreshAccessToken,
    searchTracks,
    handleTrackClick,
    handleMusicClick,
    fetchSpotifyTrackInfo
  };
};

export default useSpotify;