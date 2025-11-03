import { motion, AnimatePresence } from "framer-motion";
import SummaryPlayButton from "@/assets/SummaryPlayButton";
import usePiece from "@/hooks/usePiece";
import type { PieceProps } from "@/pages/episode/types";

const Piece = ({ pieceId, currentPieceId, item, programInfo, handleTagSelect, selected, currentTrack, isPlaying, setCurrentTrack, setIsPlaying, index }: PieceProps) => {
  const { isActive, isOpen, handleToggle, musicSpotifyData, handleMusicClickWrapper, handlePieceClick } = usePiece({ 
    item, 
    programInfo,
    pieceId, 
    currentPieceId,
    currentTrack, 
    setCurrentTrack, 
    isPlaying, 
    setIsPlaying,
  });

  if (!item.title || item.title.trim() === "") {
    return null;
  }

  const thumbnailImage = item.imageUrl || 'https://www.paintgarden.com/cdn/shop/products/2E3549.png?v=1658180345';
  // const duration = item.duration || '0:00';

  return (
    <div key={item.id} className="w-full flex flex-col">
    <div className="w-full flex items-center justify-between gap-[16px] border-t border-gray-200 px-[22px] py-[16px]">
      {/* 왼쪽: 번호 + 썸네일 + 제목/태그 */}
      <div className="flex items-center gap-[16px] flex-1">
        {/* 번호 */}
        <div className="w-[40px] h-[40px] rounded-full bg-blue/10 flex items-center justify-center flex-shrink-0">
          <span className="text-blue font-semibold text-[16px]">{index}</span>
        </div>
        
        {/* 썸네일 이미지 */}
        <img 
          src={thumbnailImage} 
          alt={item.title}
          className="w-[60px] h-[60px] rounded-[5px] object-cover flex-shrink-0"
        />
        
        {/* 제목 + 태그 */}
        <div onClick={handleToggle} className="flex flex-col items-start justify-center gap-[6px] cursor-pointer flex-1 min-w-0">
          <p className={`${isActive ? 'text-blue' : 'text-gray7'} font-semibold text-[16px] leading-tight truncate w-full`}>
            {item.title}
          </p>
          <div className="flex items-center gap-[6px] flex-wrap">
            {item.tags?.map((tag: string) => (
              <button 
                key={tag} 
                className={`px-[12px] py-[2px] border border-gray-200 rounded-full text-[12px] transition-colors ${
                  selected?.includes(tag) ? 'bg-blue text-white border-blue' : 'bg-white hover:bg-gray-50'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTagSelect(tag);
                }}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 오른쪽: 시간 + 플레이 버튼 + 드롭다운 */}
      <div className="flex items-center gap-[16px] flex-shrink-0">
        {/* <span className="text-gray-500 text-[14px]">
          <span className="material-symbols-outlined" style={{ fontSize: '18px', verticalAlign: 'middle' }}>schedule</span>
          {' '}{duration}
        </span> */}
        
        <div 
          className="cursor-pointer"
          onClick={handlePieceClick}
        >
          <SummaryPlayButton active={isActive} />
        </div>
        
        <div onClick={handleToggle} className="cursor-pointer">
          <motion.span 
            className="material-symbols-outlined" 
            style={{ fontSize: '28px' }}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            keyboard_arrow_down
          </motion.span>
        </div>
      </div>
    </div>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="summary-content w-full flex flex-col items-start bg-backgroundLight px-[32px] py-[20px] gap-[14px] overflow-hidden"
        >
          <div className="w-full flex flex-col items-start justify-start gap-[6px]">
            <p className="font-semibold leading-none">내용 요약</p>
            <p className="text-gray5 text-[14px] leading-none">{item.summary}</p>
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-[6px]">
            <p className="font-semibold">사연 요약</p>
            <div className="text-gray5 text-[14px] text-left">
              {item.stories.map((story: any, idx: number) => (
                <p key={idx}>{story.listenerName} : {story.content}</p>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-[6px]">
            <p className="font-semibold">음악 정보</p>
            <div className="w-full flex items-start justify-start gap-[20px]">
              {item.musics.map((music: any, index: number) => {
                const musicKey = `${music.title}-${music.artist}`;
                const spotifyData = musicSpotifyData[musicKey];
                const isCurrentTrack = currentTrack === spotifyData?.spotifyUri;
                const imageUrl = spotifyData?.imageUrl || music.image || '/assets/images/spotifyLoading.jpg';
                
                return (
                  <div 
                    key={index}
                    className="flex flex-col items-start justify-center w-[120px] cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMusicClickWrapper(music)}
                  >
                    <div className="relative">
                      <img 
                        src={imageUrl} 
                        alt={`${music.title} 앨범 커버`} 
                        className={`w-[120px] h-[120px] rounded-[5px] transition-all ${
                          isCurrentTrack ? 'brightness-75' : ''
                        }`}
                      />
                      {isCurrentTrack && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`w-8 h-8 rounded-full bg-white/90 flex items-center justify-center ${
                            isPlaying ? 'animate-pulse' : ''
                          }`}>
                            {isPlaying ? (
                              <div className="w-3 h-3 bg-blue rounded-sm" />
                            ) : (
                              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-blue border-b-[6px] border-b-transparent ml-0.5" />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <p className={`leading-none mt-[8px] transition-colors ${
                      isCurrentTrack ? 'text-blue' : ''
                    }`}>{music.title}</p>
                    <p className={`text-sm transition-colors ${
                      isCurrentTrack ? 'text-blue/80' : 'text-gray5'
                    }`}>{music.artist}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  )
};

export default Piece;