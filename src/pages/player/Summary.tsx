import { useState, useMemo, useEffect } from "react";
import SummaryPlayButton from "@/assets/SummaryPlayButton";
import { motion, AnimatePresence } from "framer-motion";

interface Track {
  id: number;
  title: string;
  artist: string;
  image: string;
  spotifyUri?: string;
}

interface Device {
  id: string;
  is_active: boolean;
  name: string;
  type: string;
}

interface SummaryProps {
  currentTrack: string | null;
  setCurrentTrack: (track: string | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('spotify_refresh_token');
  const clientId = localStorage.getItem('spotify_client_id');
  
  if (!refreshToken || !clientId) {
    console.error('No refresh token or client ID found');
    return null;
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + import.meta.env.VITE_CLIENT_SECRET)
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('spotify_access_token', data.access_token);
      return data.access_token;
    } else {
      console.error('Failed to refresh token');
      return null;
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

export const Summary = ({ currentTrack, setCurrentTrack, isPlaying, setIsPlaying }: SummaryProps) => {
  const tags = ['게스트', '사연', '정보', '퀴즈', '연애', '건강', '음악'];
  const [selected, setSelected] = useState<string[]>([]);
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const [summaryItems, setSummaryItems] = useState([
    {
      id: 'item1',
      title: '이제는 말할 수 있다! 청춘의 끝에서 시작된 진짜 인생',
      time: '14:20',
      isActive: true,
      tags: ['사연', '퀴즈', '연애'],
      content: {
        summary: '청춘의 마지막 순간에서 시작된 새로운 인생 이야기. 지나온 시간 속 아쉬움, 설렘, 그리고 후회까지, 듣는 이들의 공감과 위로를 전합니다. 연애와 성장, 인생의 터닝포인트가 담긴 청취자들의 진솔한 사연과 함께하는 시간.',
        stories: '김유진님: 스물아홉, 아무것도 이룬 것 없이 끝나버린 줄 알았는데, 그 끝에서 새로운 인연을 만났어요.\n박재현님: 졸업과 이별이 한꺼번에 찾아왔지만, 지금 생각하면 그때가 내 인생의 진짜 시작이었네요\n송지현님: 그때 용기 내지 못한 게 아직도 아쉽지만, 이제는 다시 시작해보려 합니다.',
        music: {
          image: '',
          title: '안녕',
          artist: '조이',
          spotifyUri: 'spotify:track:2Yw6rE3t9aZ1QQu5T8Lv5u'
        }
      }
    },
    {
      id: 'item2',
      title: '캠퍼스에 이런 일이? 대학생들만 아는 진짜 축제 뒷이야기',
      time: '15:30',
      isActive: false,
      tags: ['사연', '정보'],
      content: {
        summary: '대학 축제의 숨겨진 이야기와 재미있는 에피소드를 공유하는 시간.',
        stories: '이지원님: 작년 축제에서 벌어진 일화가 아직도 기억에 남네요.\n최민수님: 축제 준비 과정에서 있었던 웃지 못할 사연들...',
        music: {
          image: '',
          title: '우주를 줄게',
          artist: '볼빨간 사춘기'
        }
      }
    },
    {
      id: 'item3',
      title: '졸업생도 몰랐던, 캠퍼스 전설의 비밀장소들...직접 다녀왔습니다',
      time: '16:45',
      isActive: false,
      tags: ['정보', '퀴즈'],
      content: {
        summary: '캠퍼스의 숨겨진 명소와 그곳에 얽힌 재미있는 이야기들을 소개합니다.',
        stories: '김서연님: 4년 다니면서도 몰랐던 곳이 많았네요.\n박지훈님: 다음 학기에 꼭 가봐야겠어요!',
        music: {
          image: '',
          title: '한페이지가 될 수 있게',
          artist: 'DAY6 (데이식스)'
        }
      }
    },
    {
      id: 'item4',
      title: '다 포기하고 싶던 순간, 내 인생을 바꾼 한 통의 메시지',
      time: '17:20',
      isActive: false,
      tags: ['사연', '건강'],
      content: {
        summary: '힘든 시기를 겪은 청취자들의 감동적인 이야기와 그들을 지켜준 소중한 순간들을 나눕니다.',
        stories: '정다은님: 그때 받은 메시지가 지금도 제게 큰 힘이 됩니다.\n이현우님: 비슷한 경험이 있어서 더 공감이 가네요.',
        music: {
          image: '',
          title: '미라클',
          artist: 'NCT WISH'
        }
      }
    },
    {
      id: 'item5',
      title: '썸타던 친구와 최악의 이별...그날 밤 무슨 일이?',
      time: '18:00',
      isActive: false,
      tags: ['사연', '연애'],
      content: {
        summary: '친구와의 관계에서 겪은 아픔과 성장에 대한 이야기를 나눕니다.',
        stories: '송미나님: 그때의 상처가 지금은 추억이 되었어요.\n강동훈님: 비슷한 경험이 있어서 더 공감이 가네요.',
        music: {
          image: '',
          title: '폭죽타임',
          artist: '이승윤'
        }
      }
    },
    {
      id: 'item6',
      title: '첫 사회생활, 내 월급은 왜 이 모양일까? 현실 직장인 생존기',
      time: '18:45',
      isActive: false,
      tags: ['정보', '건강'],
      content: {
        summary: '신입 직장인들의 현실적인 고민과 해결 방법을 공유하는 시간.',
        stories: '김태영님: 제 경험담이 도움이 되었으면 좋겠네요.\n이수진님: 정말 공감되는 내용이에요.',
        music: {
          image: '',
          title: '어때',
          artist: '현아'
        }
      }
    }
  ]);

  const handleTagSelect = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleToggle = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleTrackClick = async (track: Track) => {
    console.log('Track clicked:', track);

    if (!track.spotifyUri) {
      console.log('No Spotify URI found for track');
      return;
    }

    let token = localStorage.getItem('spotify_access_token');
    if (!token) {
      console.log('No Spotify token found');
      return;
    }

    try {
      let devicesResponse = await fetch('https://api.spotify.com/v1/me/player/devices', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (devicesResponse.status === 401) {
        console.log('Token expired, refreshing...');
        token = await refreshAccessToken();
        if (!token) {
          console.error('Failed to refresh token');
          return;
        }

        devicesResponse = await fetch('https://api.spotify.com/v1/me/player/devices', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }

      const devicesData = await devicesResponse.json();
      console.log('Available devices:', devicesData);

      let activeDevice = devicesData.devices.find((device: Device) => device.is_active);
      
      if (!activeDevice && devicesData.devices.length > 0) {
        activeDevice = devicesData.devices[0];
        await fetch(`https://api.spotify.com/v1/me/player`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            device_ids: [activeDevice.id],
            play: false
          })
        });
      }

      if (!activeDevice) {
        console.error('No available devices found');
        return;
      }

      if (currentTrack === track.spotifyUri) {
        const action = isPlaying ? 'pause' : 'play';
        let playResponse = await fetch(`https://api.spotify.com/v1/me/player/${action}?device_id=${activeDevice.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (playResponse.status === 401) {
          console.log('Token expired, refreshing...');
          token = await refreshAccessToken();
          if (!token) {
            console.error('Failed to refresh token');
            return;
          }

          playResponse = await fetch(`https://api.spotify.com/v1/me/player/${action}?device_id=${activeDevice.id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
        }

        if (playResponse.ok) {
          setIsPlaying(!isPlaying);
        }
      } else {
        let playResponse = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${activeDevice.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uris: [track.spotifyUri]
          })
        });

        if (playResponse.status === 401) {
          console.log('Token expired, refreshing...');
          token = await refreshAccessToken();
          if (!token) {
            console.error('Failed to refresh token');
            return;
          }

          playResponse = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${activeDevice.id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              uris: [track.spotifyUri]
            })
          });
        }

        if (playResponse.ok) {
          setCurrentTrack(track.spotifyUri);
          setIsPlaying(true);
        }
      }

    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  useEffect(() => {
    const searchTracks = async () => {
      let token = localStorage.getItem('spotify_access_token');
      console.log('Initial Spotify Token:', token);

      if (!token) {
        console.log('No Spotify token found');
        return;
      }

      const updatedItems = await Promise.all(
        summaryItems.map(async (item) => {
          try {
            const query = `${item.content.music.title} ${item.content.music.artist}`;
            console.log('Searching for:', query);

            let response = await fetch(
              `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }
            );

            if (response.status === 401) {
              console.log('Token expired, refreshing...');
              token = await refreshAccessToken();
              if (!token) {
                console.error('Failed to refresh token');
                return item;
              }

              response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
                {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                }
              );
            }

            if (response.ok) {
              const data = await response.json();
              console.log('Search Result:', data);

              if (data.tracks.items.length > 0) {
                const spotifyTrack = data.tracks.items[0];
                console.log('Found track:', spotifyTrack);

                return {
                  ...item,
                  content: {
                    ...item.content,
                    music: {
                      ...item.content.music,
                      image: spotifyTrack.album.images[0]?.url || item.content.music.image,
                      spotifyUri: spotifyTrack.uri
                    }
                  }
                };
              }
            }
            return item;
          } catch (error) {
            console.error(`Error searching track ${item.content.music.title}:`, error);
            return item;
          }
        })
      );

      console.log('Updated Items:', updatedItems);
      setSummaryItems(updatedItems);
    };

    searchTracks();
  }, []);

  // 필터링된 아이템 계산
  const filteredItems = useMemo(() => {
    if (selected.length === 0) return summaryItems;
    
    return summaryItems.filter(item => 
      selected.every(tag => item.tags.includes(tag))
    );
  }, [selected, summaryItems]);

  return (
    <div className="w-full mt-[35px] flex flex-col items-start justify-center">
      <p className="text-[20px] font-semibold mb-[10px]">프로그램 요약</p>
      <div className="w-full flex items-center justify-start gap-[10px]">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`px-[24px] py-[4px] border border-gray-200 rounded-full text-[14px] transition-colors ${
              selected.includes(tag) 
                ? "bg-blue text-white border-blue" 
                : "bg-white hover:bg-gray-50"
            }`}
            onClick={() => handleTagSelect(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>
      <div className="w-full flex flex-col mt-[18px]">
        {filteredItems.length === 0 ? (
          <div className="w-full text-center py-8 text-gray-500">
            선택한 태그와 일치하는 프로그램이 없습니다.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="w-full flex flex-col">
              <div className="w-full flex items-center justify-start gap-[22px] border-t border-gray-200 px-[22px]">
                <div 
                  className="cursor-pointer"
                  onClick={() => handleTrackClick({
                    id: parseInt(item.id.replace('item', '')),
                    title: item.content.music.title,
                    artist: item.content.music.artist,
                    image: item.content.music.image,
                    spotifyUri: item.content.music.spotifyUri
                  })}
                >
                  <SummaryPlayButton active={item.isActive} />
                </div>
                <div onClick={() => handleToggle(item.id)} className="flex flex-col grow items-start justify-center gap-[2px] py-[18px] cursor-pointer">
                  <p className={`${item.isActive ? 'text-blue' : 'text-gray7'} font-semibold text-[18px] leading-none`}>{item.title}</p>
                  <p className="text-gray7 text-[14px] leading-none">{item.time}</p>
                </div>
                <div className="flex items-center justify-start gap-[10px] ml-auto">
                  {item.tags.map((tag) => (
                    <button 
                      key={tag} 
                      className={`px-[24px] py-[4px] border border-gray-200 rounded-full text-[14px] transition-colors ${
                        selected.includes(tag) ? 'bg-blue text-white border-blue' : 'bg-background'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTagSelect(tag);
                      }}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
                <div onClick={() => handleToggle(item.id)} className="flex items-center justify-start gap-[10px]">
                  <motion.span 
                    className="material-symbols-outlined cursor-pointer" 
                    style={{ fontSize: '32px' }}
                    animate={{ rotate: openItems[item.id] ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    keyboard_arrow_down
                  </motion.span>
                </div>
              </div>
              <AnimatePresence>
                {openItems[item.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="summary-content w-full flex flex-col items-start bg-backgroundLight px-[32px] py-[20px] gap-[14px] overflow-hidden"
                  >
                    <div className="w-full flex flex-col items-start justify-start gap-[6px]">
                      <p className="font-semibold leading-none">내용 요약</p>
                      <p className="text-gray5 text-[14px] leading-none">{item.content.summary}</p>
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-[6px]">
                      <p className="font-semibold">사연 요약</p>
                      <p className="text-gray5 text-[14px] text-left">
                        {item.content.stories.split('\n').map((story, idx) => (
                          <span key={idx}>{story}<br/></span>
                        ))}
                      </p>
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-[6px]">
                      <p className="font-semibold">음악 정보</p>
                      <div 
                        className="flex flex-col items-start justify-center w-[120px] cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleTrackClick({
                          id: parseInt(item.id.replace('item', '')),
                          title: item.content.music.title,
                          artist: item.content.music.artist,
                          image: item.content.music.image,
                          spotifyUri: item.content.music.spotifyUri
                        })}
                      >
                        <div className="relative">
                          <img 
                            src={item.content.music.image || 'https://via.placeholder.com/120'} 
                            alt={`${item.content.music.title} 앨범 커버`} 
                            className={`w-[120px] h-[120px] rounded-[5px] transition-all ${
                              currentTrack === item.content.music.spotifyUri ? 'brightness-75' : ''
                            }`}
                          />
                          {currentTrack === item.content.music.spotifyUri && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className={`w-8 h-8 rounded-full bg-white/90 flex items-center justify-center ${
                                isPlaying ? 'animate-pulse' : ''
                              }`}>
                                {isPlaying ? (
                                  <div className="w-3 h-3 bg-blue rounded-sm" />
                                ) : (
                                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-blue border-b-[6px] border-b-transparent ml-0.5" />
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        <p className={`leading-none mt-[8px] transition-colors ${
                          currentTrack === item.content.music.spotifyUri ? 'text-blue' : ''
                        }`}>{item.content.music.title}</p>
                        <p className={`text-sm transition-colors ${
                          currentTrack === item.content.music.spotifyUri ? 'text-blue/80' : 'text-gray5'
                        }`}>{item.content.music.artist}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
    </div>
  );
};