import { useEffect, useState } from 'react';
import useSpotify from './useSpotify';

interface usePieceProps {
  item: any;
  pieceId: number;
  currentTrack: string | null;
  setCurrentTrack: (track: string | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const usePiece = ({ item, pieceId, currentTrack, setCurrentTrack, isPlaying, setIsPlaying }: usePieceProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { handleMusicClick, fetchSpotifyTrackInfo } = useSpotify();
  const [musicSpotifyData, setMusicSpotifyData] = useState<{ [key: string]: { spotifyUri: string; imageUrl: string } }>({});

  // 단일 조각의 활성화 상태 관리
  const toggleActive = () => {
    setIsActive(!isActive);
  };

  // 아이템 오픈/클로즈 핸들러
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (item.pieceId == pieceId) {
      setIsActive(true);
      setIsOpen(true);
    }
  }, [item, pieceId]);

  // 페이지 진입 시 모든 음악에 대해 Spotify 이미지 미리 받아오기 (재생하지 않음)
  useEffect(() => {
    const fetchAllSpotifyData = async () => {
      const results: { [key: string]: { spotifyUri: string; imageUrl: string } } = {};
      for (const music of item.musics) {
        const musicKey = `${music.title}-${music.artist}`;
        if (musicSpotifyData[musicKey]) continue;
        const spotifyData = await fetchSpotifyTrackInfo(music.title, music.artist);
        if (spotifyData) {
          results[musicKey] = spotifyData;
        }
      }
      if (Object.keys(results).length > 0) {
        setMusicSpotifyData(prev => ({ ...prev, ...results }));
      }
    };
    fetchAllSpotifyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.musics]);

  // 음악 클릭 시 재생/토글
  const handleMusicClickWrapper = async (music: any) => {
    const musicKey = `${music.title}-${music.artist}`;
    const spotifyData = await handleMusicClick(
      music.title,
      music.artist,
      currentTrack,
      setCurrentTrack,
      isPlaying,
      setIsPlaying
    );
    
    if (spotifyData) {
      setMusicSpotifyData(prev => ({
        ...prev,
        [musicKey]: spotifyData
      }));
    }
  };

  return {
    isActive,
    toggleActive,
    isOpen,
    handleToggle,
    musicSpotifyData,
    handleMusicClickWrapper,
  };
};

export default usePiece;