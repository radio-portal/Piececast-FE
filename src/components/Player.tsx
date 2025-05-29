import { useState, useRef } from 'react';
import { TogglePlayButton } from '@/assets/TogglePlayButton';
import ReactPlayer from 'react-player';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
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

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed z-20 bottom-0 w-full h-[70px] bg-white border-t border-gray-200">
      <ReactPlayer
        ref={playerRef}
        url="/assets/mbc-2200.mp3"
        playing={isPlaying}
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="0"
        height="0"
      />
      <div className="w-full flex items-center gap-2">
        <div className="relative w-full h-[3px] bg-gray-200">
          <div 
            className="absolute h-full bg-blue rounded-r-lg"
            style={{ width: `${played * 100}%` }}
          />
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onChange={handleSeek}
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
      <div className="w-full h-full px-[25px] grid grid-cols-3 items-center">
        <div className="flex items-center">
          <img src="/assets/images/superradio.jpg" alt="logo" className="w-[54px] h-[54px] rounded-[4px] border border-gray-200 mr-[12px]" />
          <div>
            <p className="font-semibold ">하디의 목소리로 기분 업! 오늘의 음악과 사연들</p>
            <p className="text-sm text-gray7">하하의 슈퍼라디오 • 25년 5월 8일 월요일 방송</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-[8px]">
          <div className="flex items-center justify-center gap-[32px]">
            <img src="/assets/icons/player/prevIcon.svg" alt="prev" />
            <TogglePlayButton isPlaying={isPlaying} onClick={handleTogglePlay} />
            <img src="/assets/icons/player/nextIcon.svg" alt="next" />
          </div>
        </div>
        <div className="flex justify-end">
          <span className="text-xs text-gray9">{formatTime(playedSeconds)} / {formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default Player;