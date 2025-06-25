import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { usePlayer } from '@/hooks/usePlayer';

interface PlayerContextType {
  isPlaying: boolean;
  played: number;
  duration: number;
  playedSeconds: number;
  playerInfo: {
    audioPath: string;
    title: string;
    programName: string;
    date: string;
  };
  playerRef: React.RefObject<any>;
  handleTogglePlay: () => void;
  handleProgress: (state: { played: number; playedSeconds: number }) => void;
  handleDuration: (duration: number) => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPlayerAudio: (pieceId: number, audioPath: string, title: string, programName: string, date: string) => void;
  formatTime: (seconds: number) => string;
  currentPlayingPieceId: number;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const playerState = usePlayer();

  return (
    <PlayerContext.Provider value={playerState}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
}; 