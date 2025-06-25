export interface Program {
  id: number;
  name: string;
}

export interface Music {
  title: string;
  artist: string;
}

export interface Episode {
  date: string;
  pieceTitles: string[];
  musics: Music[];
}

export interface Piece {
  title: string;
  summary: string;
  tags: string[];
  musics: Music[];
}

export interface PieceApiResponse {
  program: Program;
  episode: Episode;
  piece: Piece;
}
