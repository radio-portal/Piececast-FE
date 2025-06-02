import { useState, useMemo } from "react";
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
      title: '이제는 말할 수 있다! 청춘의 끝에서 시작된 진짜 인생',
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
      title: '캠퍼스에 이런 일이? 대학생들만 아는 진짜 축제 뒷이야기',
      time: '15:30',
      isActive: false,
      tags: ['사연', '정보'],
      content: {
        summary: '대학 축제의 숨겨진 이야기와 재미있는 에피소드를 공유하는 시간.',
        stories: '이지원님: 작년 축제에서 벌어진 일화가 아직도 기억에 남네요.\n최민수님: 축제 준비 과정에서 있었던 웃지 못할 사연들...',
        music: {
          image: '/assets/images/superradio.jpg',
          title: '우주를 줄게',
          artist: '볼빨간 사춘기'
        }
      }
    },
    {
      id: 'item3',
      title: '졸업생도 몰랐던, 캠퍼스 전설의 비밀장소들...직접 다녀왔습니다',
      time: '16:45',
      isActive: false,
      tags: ['정보', '퀴즈'],
      content: {
        summary: '캠퍼스의 숨겨진 명소와 그곳에 얽힌 재미있는 이야기들을 소개합니다.',
        stories: '김서연님: 4년 다니면서도 몰랐던 곳이 많았네요.\n박지훈님: 다음 학기에 꼭 가봐야겠어요!',
        music: {
          image: '/assets/images/superradio.jpg',
          title: '한페이지가 될 수 있게',
          artist: 'DAY6 (데이식스)'
        }
      }
    },
    {
      id: 'item4',
      title: '다 포기하고 싶던 순간, 내 인생을 바꾼 한 통의 메시지',
      time: '17:20',
      isActive: false,
      tags: ['사연', '건강'],
      content: {
        summary: '힘든 시기를 겪은 청취자들의 감동적인 이야기와 그들을 지켜준 소중한 순간들을 나눕니다.',
        stories: '정다은님: 그때 받은 메시지가 지금도 제게 큰 힘이 됩니다.\n이현우님: 비슷한 경험이 있어서 더 공감이 가네요.',
        music: {
          image: '/assets/images/superradio.jpg',
          title: '미라클',
          artist: 'NCT WISH'
        }
      }
    },
    {
      id: 'item5',
      title: '썸타던 친구와 최악의 이별...그날 밤 무슨 일이?',
      time: '18:00',
      isActive: false,
      tags: ['사연', '연애'],
      content: {
        summary: '친구와의 관계에서 겪은 아픔과 성장에 대한 이야기를 나눕니다.',
        stories: '송미나님: 그때의 상처가 지금은 추억이 되었어요.\n강동훈님: 비슷한 경험이 있어서 더 공감이 가네요.',
        music: {
          image: '/assets/images/superradio.jpg',
          title: '폭죽타임',
          artist: '이승윤'
        }
      }
    },
    {
      id: 'item6',
      title: '첫 사회생활, 내 월급은 왜 이 모양일까? 현실 직장인 생존기',
      time: '18:45',
      isActive: false,
      tags: ['정보', '건강'],
      content: {
        summary: '신입 직장인들의 현실적인 고민과 해결 방법을 공유하는 시간.',
        stories: '김태영님: 제 경험담이 도움이 되었으면 좋겠네요.\n이수진님: 정말 공감되는 내용이에요.',
        music: {
          image: '/assets/images/superradio.jpg',
          title: '어때',
          artist: '현아'
        }
      }
    }
  ];

  // 필터링된 아이템 계산
  const filteredItems = useMemo(() => {
    if (selected.length === 0) return summaryItems;
    
    return summaryItems.filter(item => 
      selected.every(tag => item.tags.includes(tag))
    );
  }, [selected, summaryItems]);

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
          filteredItems.map((item) => (
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
                    <button 
                      key={tag} 
                      className={`px-[24px] py-[4px] border border-gray-200 rounded-full text-[14px] transition-colors ${
                        selected.includes(tag) ? 'bg-blue text-white border-blue' : 'bg-background'
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
          ))
        )}
      </div>
    </div>
  );
};