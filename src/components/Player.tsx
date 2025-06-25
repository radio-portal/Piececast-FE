import { TogglePlayButton } from '@/assets/TogglePlayButton';
import ReactPlayer from 'react-player';
import { usePlayerContext } from '@/contexts/PlayerContext';

const Player = () => {
  const {
    isPlaying,
    played,
    duration,
    playedSeconds,
    playerInfo,
    playerRef,
    handleTogglePlay,
    handleProgress,
    handleDuration,
    handleSeek,
    formatTime,
  } = usePlayerContext();

  return (
    <div className="fixed z-20 bottom-0 w-full h-[70px] bg-white border-t border-gray-200">
      <ReactPlayer
        ref={playerRef}
        url={playerInfo.audioPath}
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
          <img src={playerInfo.thumbnailUrl || '/assets/images/spotifyLoading.jpg'} alt="logo" className="w-[54px] h-[54px] rounded-[4px] border border-gray-200 mr-[12px]" />
          <div>
            <p className="font-semibold ">{playerInfo.title}</p>
            <p className="text-sm text-gray7">{playerInfo.programName} • {playerInfo.date}</p>
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