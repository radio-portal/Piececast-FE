import { useNavigate } from "react-router-dom";
import { useCards } from "@/hooks/useCards";
import type { Card } from "@/types/cards";

const Content = () => {
  const { mainCards } = useCards();
  const navigate = useNavigate();
  
  const filteredPieces = (card: Card) => 
    card.pieces.filter((piece) => piece.title && piece.title.trim() !== "");

  return (
    <div className="w-full flex gap-[20px] bg-backgroundLight p-[40px] flex-1">
      {mainCards.map((col, colIdx) => (
        <div key={colIdx} className="flex-1 flex flex-col gap-[20px]">
          {col.map((card: Card) => {
            const validPieces = filteredPieces(card);
            console.log(card)
            // pieces 배열에서 imageUrl이 있는 첫 번째 piece 찾기
            const thumbnailImage = card.pieces.find(piece => piece?.imageUrl)?.imageUrl || 'https://www.paintgarden.com/cdn/shop/products/2E3549.png?v=1658180345';
            
            return (
              <div key={card.episodeId} className="flex flex-col w-full bg-white rounded-[5px] overflow-hidden">
                {/* 프로그램 정보 */}
                <div className="px-[22px] pt-[14px]">
                  <div className="flex w-full items-center pb-[12px]">
                    <img src={card.thumbnailUrl} alt={card.programName} className="w-[40px] h-[40px] rounded-full" />
                    <div className="flex flex-col items-start justify-between ml-[10px] grow">
                      <div className="font-bold text-lg text-gray2 flex-1 leading-[1] cursor-pointer">{card.programName}</div>
                      <div className="text-gray9 text-[12px] mt-[3px]">{card.station} · {card.latestEpisodeDate}</div>
                    </div>
                  </div>
                </div>

                {/* 썸네일 */}
                <div className="w-full h-[200px] bg-gray-800 relative overflow-hidden">
                  <img 
                    src={thumbnailImage} 
                    alt={card.programName}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Piece 목록 */}
                <div className="px-[22px] pb-[14px]">
                  <div className="flex flex-col gap-[4px]">
                    {validPieces.map((piece, idx) => (
                      <div
                        key={idx}
                        onClick={() => navigate(`/episode/${card.episodeId}/${piece.pieceId}`)}
                        className="flex items-center gap-[12px] py-[10px] px-[8px] rounded-[4px] cursor-pointer hover:bg-gray-50 transition-all group"
                      >
                        {/* 번호 */}
                        <div className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-blue/10 group-hover:bg-blue/20 transition-colors">
                          <span className="text-blue font-bold text-[14px]">
                            {idx + 1}
                          </span>
                        </div>
                        
                        {/* 제목 */}
                        <span className="text-gray3 font-semibold text-[14px] group-hover:text-blue transition-colors flex-1">
                          {piece.title}
                        </span>
                        
                        {/* 화살표 아이콘 */}
                        <svg className="w-[16px] h-[16px] text-gray6 group-hover:text-blue transition-colors opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Content;