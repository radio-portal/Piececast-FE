import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

interface PlayerInfo {
  pieceId: number;
  audioPath: string;
  title: string;
  programName: string;
  date: string;
}

export const usePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
    pieceId: 0,
    audioPath: '',
    title: '오디오 정보 없음',
    programName: '정보 없음',
    date: '정보 없음'
  });
  const playerRef = useRef<ReactPlayer>(null);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setPlayed(state.played);
    setPlayedSeconds(state.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setPlayed(seekTime);
    playerRef.current?.seekTo(seekTime);
  };

  const setPlayerAudio = (pieceId: number, audioPath: string, title: string, programName: string, date: string) => {
    if (playerInfo.pieceId === pieceId && playerInfo.audioPath === audioPath) {
      return;
    }
    
    setPlayerInfo({
      pieceId,
      audioPath,
      title,
      programName,
      date
    });
    setPlayed(0);
    setPlayedSeconds(0);
    setIsPlaying(true);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };



  return {
    isPlaying,
    played,
    duration,
    playedSeconds,
    playerInfo,
    playerRef,
    currentPlayingPieceId: playerInfo.pieceId,
    handleTogglePlay,
    handleProgress,
    handleDuration,
    handleSeek,
    setPlayerAudio,
    formatTime,
  };
};
