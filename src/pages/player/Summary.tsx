import { useState } from "react";
import SummaryPlayButton from "@/assets/SummaryPlayButton";
import { motion, AnimatePresence } from "framer-motion";

export const Summary = () => {
  const tags = ['게스트', '사연', '정보', '퀴즈', '연애', '건강', '음악'];
  const [selected, setSelected] = useState<string[]>([]);
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const handleTagSelect = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleToggle = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const summaryItems = [
    {
      id: 'item1',
      title: '하디의 목소리로 기분 업! 오늘의 음악과 사연들',
      time: '14:20',
      isActive: true,
      tags: ['사연', '퀴즈', '연애'],
      content: {
        summary: 'DJ 하하가 진행하는 생방송에서 청취자들의 사연을 소개하며 기분 좋은 음악을 전하는 시간.',
        stories: '박강래님: 다운되었던 제 기분이 하디 목소리 한 단계 업되는 느낌입니다. 축복합니다.\n김경태님: 부장님 아침 출근하실 때 컨디션 보고 좋으면 밝게, 안 좋으면 무거운 것 같아요. 오늘은 맑음이시라 마음 편히 일하고 있네요.',
        music: {
          image: '/assets/images/superradio.jpg',
          title: '안녕',
          artist: '조이'
        }
      }
    },
    {
      id: 'item2',
      title: '키가 축복? 하하의 유쾌한 이야기와 음악으로 위로받는 시간',
      time: '14:20',
      isActive: false,
      tags: ['사연', '퀴즈', '연애'],
      content: {
        summary: 'DJ 하하가 진행하는 생방송에서 청취자들의 사연을 소개하며 기분 좋은 음악을 전하는 시간.',
        stories: '박강래님: 다운되었던 제 기분이 하디 목소리 한 단계 업되는 느낌입니다. 축복합니다.\n김경태님: 부장님 아침 출근하실 때 컨디션 보고 좋으면 밝게, 안 좋으면 무거운 것 같아요. 오늘은 맑음이시라 마음 편히 일하고 있네요.',
        music: {
          image: '/assets/images/superradio.jpg',
          title: '안녕',
          artist: '조이'
        }
      }
    }
  ];

  return (
    <div className="w-full mt-[35px] flex flex-col items-start justify-center">
      <p className="text-[20px] font-semibold mb-[10px]">프로그램 요약</p>
      <div className="w-full flex items-center justify-start gap-[10px]">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`px-[24px] py-[4px] border border-gray-200 rounded-full text-[14px] transition-colors ${selected.includes(tag) ? "bg-background" : "bg-white"}`}
            onClick={() => handleTagSelect(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>
      <div className="w-full flex flex-col mt-[18px]">
        {summaryItems.map((item) => (
          <div key={item.id} className="w-full flex flex-col">
            <div className="w-full flex items-center justify-start gap-[22px] border-t border-gray-200 px-[22px]">
              <div className="cursor-pointer">
                <SummaryPlayButton active={item.isActive} />
              </div>
              <div onClick={() => handleToggle(item.id)} className="flex flex-col grow items-start justify-center gap-[2px] py-[18px] cursor-pointer">
                <p className={`${item.isActive ? 'text-blue' : 'text-gray7'} font-semibold text-[18px] leading-none`}>{item.title}</p>
                <p className="text-gray7 text-[14px] leading-none">{item.time}</p>
              </div>
              <div className="flex items-center justify-start gap-[10px] ml-auto">
                {item.tags.map((tag) => (
                  <button key={tag} className={`px-[24px] py-[4px] border border-gray-200 rounded-full text-[14px] transition-colors bg-background`}>
                    #{tag}
                  </button>
                ))}
              </div>
              <div onClick={() => handleToggle(item.id)} className="flex items-center justify-start gap-[10px]">
                <motion.span 
                  className="material-symbols-outlined cursor-pointer" 
                  style={{ fontSize: '32px' }}
                  animate={{ rotate: openItems[item.id] ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  keyboard_arrow_down
                </motion.span>
              </div>
            </div>
            <AnimatePresence>
              {openItems[item.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="summary-content w-full flex flex-col items-start bg-backgroundLight px-[32px] py-[20px] gap-[14px] overflow-hidden"
                >
                  <div className="w-full flex flex-col items-start justify-start gap-[6px]">
                    <p className="font-semibold leading-none">내용 요약</p>
                    <p className="text-gray5 text-[14px] leading-none">{item.content.summary}</p>
                  </div>
                  <div className="w-full flex flex-col items-start justify-start gap-[6px]">
                    <p className="font-semibold">사연 요약</p>
                    <p className="text-gray5 text-[14px] text-left">
                      {item.content.stories.split('\n').map((story, idx) => (
                        <span key={idx}>{story}<br/></span>
                      ))}
                    </p>
                  </div>
                  <div className="w-full flex flex-col items-start justify-start gap-[6px]">
                    <p className="font-semibold">음악 정보</p>
                    <div className="flex flex-col items-start justify-center w-[120px]">
                      <img src={item.content.music.image} alt="music-img" className="w-[120px] h-[120px] rounded-[5px]" />
                      <p className="leading-none mt-[8px]">{item.content.music.title}</p>
                      <p className="text-sm text-gray5">{item.content.music.artist}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};