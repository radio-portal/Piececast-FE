import Piece from "./Piece";

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
}

export const PieceList = ({ 
  pieceId,
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
      <p className="text-[20px] font-semibold mb-[10px]">프로그램 요약</p>
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
              pieceId={pieceId}
              item={item}
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