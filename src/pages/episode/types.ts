export interface Track {
  id: number;
  title: string;
  artist: string;
  image: string;
  spotifyUri?: string;
}

export interface Device {
  id: string;
  is_active: boolean;
  name: string;
  type: string;
}


export interface TrackApiResponse {
  musicId: number;
  title: string;
  artist: string;
  spotify: {
    trackName: string;
    album: string;
    url: string;
    thumbnail: string;
  };
}

export interface PieceProps {
  pieceId: number;
  currentPieceId: number;
  item: any;
  programInfo: EpisodeApiResponse | null;
  handleTagSelect: (tag: string) => void;
  selected: string[];
  currentTrack: string | null;
  isPlaying: boolean;
  setCurrentTrack: (track: string | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  index: number;
}

export interface Piece {
  pieceId: number;
  title: string;
  summary: string;
  mp3Path: string;
  tags: string[];
  imageUrl?: string;
  duration?: string;
  musics: {
    title: string;
    artist: string;
  }[];
  stories: {
    listenerName: string;
    content: string;
  }[];
}

export interface Program {
  id: number;
  name: string;
  thumbnailUrl: string;
}

export interface EpisodeApiResponse {
  program: Program;
  episode: {
    episodeId: number;
    date: string;
    pieces: Piece[];
  };
}