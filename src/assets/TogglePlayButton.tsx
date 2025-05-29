export const TogglePlayButton = ({ isPlaying, onClick }: { isPlaying: boolean, onClick: () => void }) => {
  return (
    <button onClick={onClick}>
      {isPlaying ? <img src="/assets/icons/player/pauseIcon.svg" alt="pause" /> : <img src="/assets/icons/player/playIcon.svg" alt="play" />}
    </button>
  );
};