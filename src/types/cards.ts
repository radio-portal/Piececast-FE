export interface Piece {
  pieceId: number;
  title: string;
}

export interface Card {
  programId: number;
  episodeId: number;
  programName: string;
  station: string;
  thumbnailUrl: string;
  latestEpisodeDate: string;
  pieces: Piece[];
}
