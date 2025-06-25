import Piece from "./Piece";
import type { EpisodeApiResponse } from "./types";

interface PieceListProps {
  pieceId: number;
  currentTrack: string | null;
  setCurrentTrack: (track: string | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  tags: string[];
  selected: string[];
  handleTagSelect: (tag: string) => void;
  filteredItems: any[];
  programInfo: EpisodeApiResponse | null;
}

export const PieceList = ({ 
  pieceId,
  programInfo,
  currentTrack, 
  setCurrentTrack, 
  isPlaying, 
  setIsPlaying,
  tags,
  selected,
  handleTagSelect,
  filteredItems
}: PieceListProps) => {

  return (
    <div className="w-full mt-[35px] flex flex-col items-start justify-center">
      <div className="w-full flex items-center gap-[10px]  mb-[10px]">
        <p className="text-[20px] font-semibold">프로그램 요약</p>
        <button className="px-[14px] py-[4px] rounded-full text-[14px] transition-colors bg-blue text-white">전체 재생 🎧</button>
      </div>
      <div className="w-full flex items-center justify-start gap-[10px]">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`px-[24px] py-[4px] border border-gray-200 rounded-full text-[14px] transition-colors ${
              selected.includes(tag) 
                ? "bg-blue text-white border-blue" 
                : "bg-white hover:bg-gray-50"
            }`}
            onClick={() => handleTagSelect(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>
      <div className="w-full flex flex-col mt-[18px]">
        {filteredItems.length === 0 ? (
          <div className="w-full text-center py-8 text-gray-500">
            선택한 태그와 일치하는 프로그램이 없습니다.
          </div>
        ) : (
          filteredItems.map((item: any) => (
            <Piece
              key={item.pieceId}
              pieceId={item.pieceId}
              currentPieceId={pieceId}
              item={item}
              programInfo={programInfo}
              handleTagSelect={handleTagSelect}
              selected={selected}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              setCurrentTrack={setCurrentTrack}
              setIsPlaying={setIsPlaying}
            />  
          ))
        )}
      </div>
    </div>
  );
};