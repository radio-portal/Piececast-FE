export interface Piece {
  pieceId: number;
  title: string;
}

export interface Card {
  programId: number;
  episodeId: number;
  programName: string;
  station: string;
  image: string;
  latestEpisodeDate: string;
  pieces: Piece[];
}
