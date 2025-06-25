import { useNavigate } from "react-router-dom";
import { useCards } from "@/hooks/useCards";
import type { Card } from "@/types/cards";

const Content = () => {
  const { mainCards } = useCards();
  const navigate = useNavigate();
  return (
    <div className="w-full flex gap-[20px] bg-backgroundLight p-[40px] flex-1">
      {mainCards.map((col, colIdx) => (
        <div key={colIdx} className="flex-1 flex flex-col gap-[20px]">
          {col.map((card: Card) => (
            <div key={card.episodeId} className="flex flex-col w-full bg-white rounded-[10px] px-[22px] py-[14px]">
              <div className="flex w-full border-b border-gray-300 items-center pb-[12px]">
                <img src={card.image} alt={card.programName} className="w-[40px] h-[40px] rounded-full" />
                <div className="flex flex-col items-start justify-between ml-[10px] grow">
                  <div className="font-bold text-lg text-gray2 flex-1 leading-[1] cursor-pointer">{card.programName}</div>
                  <div className="text-gray9 text-[14px] ">{card.station}</div>
                </div>
                <div className="text-gray9 text-[14px] ">{card.latestEpisodeDate}</div>
              </div>
              {card.pieces.map((piece, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(`/episode/${card.episodeId}/${piece.pieceId}`, { state: { card: card } })}
                  className={
                    "text-gray3 font-semibold py-[8px] text-[14px] cursor-pointer " +
                    (idx !== 0 ? "border-t border-gray-200" : "")
                  }
                >
                  {piece.title}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Content;