import { useNavigate } from "react-router-dom";

const cards = [
  { id: 1, station: "SBS", image:"https://image.cloud.sbs.co.kr/2021/11/10/GGu1636508361923.jpg", date: "2025-05-30", program: "두시탈출 컬투쇼", contents: [
    { id: 1, title: "청취자 웃음참기 대결, 김태균도 울었다?! 생방송 '최고의 사연'" },
    { id: 2, title: "스튜디오를 초토화시킨 '역대급 전화연결'...현장 반응은?" },
    { id: 3, title: "방청객 돌발 행동에 컬투쇼 녹화 중단, 그날의 전말은?" },
    { id: 4, title: "'신입PD 실수로 마이크 오픈' 컬투, 생방송 최대 위기!" },
    { id: 5, title: "컬투쇼 사연왕, 10년 만에 다시 만난 전설의 주인공" },
    { id: 6, title: "'실제냐 조작이냐?' 충격의 사연, 김태균의 선택은?" },
    { id: 7, title: "연예인 게스트 눈물...컬투쇼에서 깜짝 고백 터졌다" },
    { id: 8, title: "'내 애인 바람났어요' 청취자 폭로에 스튜디오 초긴장" },
    { id: 9, title: "최고 시청률 갱신! 컬투쇼 인기비결, 제작진이 말하는 뒷이야기" },
    { id: 10, title: "컬투쇼 모의고사? 청취자 퀴즈코너 대참사 현장" },
    { id: 11, title: "방송 중 '특급 게스트' 깜짝 등장, 김태균의 충격 리액션" },
    { id: 12, title: "전화연결 중 욕설 방송사고? 컬투의 위기 대처법" },
    { id: 13, title: "청취자 폭주, 홈페이지 마비! '사연 보내기' 진풍경" },
    { id: 14, title: "'가족한테 비밀로 해주세요'...익명 사연의 정체는?" },
    { id: 15, title: "두시탈출 컬투쇼, 역대 가장 웃긴 청취자 사연 TOP10" },
    { id: 16, title: "직장인 청취자 눈물...'내 상사에게 하고 싶은 말' 사연 모음" },
  ] },
  { id: 2, station: "MBC", image:"https://podcastaddict.com/cache/artwork/thumb/396347", date: "2025-05-30", program: "김이나의 별이 빛나는 밤에", contents: [
    { id: 1, title: "이제는 말할 수 있다! 청춘의 끝에서 시작된 진짜 인생" },
    { id: 2, title: "캠퍼스에 이런 일이? 대학생들만 아는 진짜 축제 뒷이야기" },
    { id: 3, title: "졸업생도 몰랐던, 캠퍼스 전설의 비밀장소들...직접 다녀왔습니다" },
    { id: 4, title: "다 포기하고 싶던 순간, 내 인생을 바꾼 한 통의 메시지" },
    { id: 5, title: "썸타던 친구와 최악의 이별...그날 밤 무슨 일이?" },
    { id: 6, title: "첫 사회생활, 내 월급은 왜 이 모양일까? 현실 직장인 생존기" },
    { id: 7, title: "엄마의 진심, 그리고 눈물...가족 대화 중 터진 감동의 한마디" },
    { id: 8, title: "절친과의 싸움, '단톡방' 대참사...이후 우리는 달라졌다" },
    { id: 9, title: "은사님이 내게 건넨 단 한 마디...30년 후에도 잊지 못했다" },
    { id: 10, title: "'취준생의 밤은 길다'...불안과 희망 사이에서 방황하는 청춘" },
    { id: 11, title: "청년이 본 요즘 세상...그날 뉴스에는 없던 진짜 이야기" },
    { id: 12, title: "현실 도피? 도전! 배낭 하나 메고 떠난 예측불허 여행기" },
    { id: 13, title: "3번의 실패 끝에 잡은 기회...다시 도전하는 사람들의 법칙" },
    { id: 14, title: "나만 힘든 걸까? 상처받은 청춘들의 속마음, 익명으로 털어놨다" },
    { id: 15, title: "연인, 친구, 가족...우리 사이에만 있었던 진짜 추억" },
    { id: 16, title: "꿈이 뭐냐고 묻는 세상, '진짜 나'를 찾기 위한 5가지 시도" },
    { id: 17, title: "세상을 뒤집어 본 청년들, 똑같은 하루도 다르게 사는 법" },
    { id: 18, title: "웃음 뒤에 숨은 눈물...청춘들의 리얼 감동 실화" },
    { id: 19, title: "바닥 찍고 성공한 사람들의 놀라운 반전 스토리" },
  ] },
  { id: 3, station: "KBS", date: "2025-05-30", image:"https://img.kbs.co.kr/kbs/228x228/programres.kbs.co.kr/r2024-0245/2024/11/19/1731998749979_552996.jpg", program: "오마이걸 효정의 볼륨을 높여요", contents: [
    { id: 1, title: "효정, 생방송 중 눈물…청취자 고백 사연에 울컥" },
    { id: 2, title: "오마이걸 멤버 총출동! 방송 현장 뒤흔든 비하인드 공개" },
    { id: 3, title: "실시간 문자, 대혼란! '엄마가 보낸 사연'에 효정 동공지진" },
    { id: 4, title: "'지하철에서 들으며 울었어요' 감동 사연에 팬심 폭발" },
    { id: 5, title: "효정이 직접 부른 깜짝 축하송, 팬들 '심쿵'" },
    { id: 6, title: "청취자 '첫사랑 이야기'…효정의 리얼 조언 대방출" },
    { id: 7, title: "'부모님 몰래 라디오 듣는 중' 들통난 청취자 사연" },
    { id: 8, title: "생일축하 문자 대란, 효정이 읽어주는 깜짝 감동" },
    { id: 9, title: "효정이 뽑은 '오늘의 사연왕'…선물 대방출 현장" },
    { id: 10, title: "팬미팅 티켓 증정 이벤트, 사연 선정 비하인드 공개" },
    { id: 11, title: "볼륨을 높여요, 역대 최고 청취율 기록! 인기 비결은?" },
    { id: 12, title: "오마이걸 멤버 깜짝 전화연결, 스튜디오 폭소 현장" },
    { id: 13, title: "연예계 비밀 폭로? 효정이 직접 들려주는 미공개 스토리" },
    { id: 14, title: "청취자 러브스토리, '이별 후 다시 만난 우리'" },
    { id: 15, title: "효정, '나도 연애 고민 있다' 현실 토크 전격 공개" },
  ] },
  { id: 4, station: "KBS", image:"https://img.kbs.co.kr/kbs/228x228/programres.kbs.co.kr/r2014-0355/2022/12/28/1672190094307_419356.jpg", date: "2025-05-30", program: "박명수의 라디오쇼", contents: [
    { id: 1, title: "박명수, 생방 중 돌발상황…제작진도 당황한 '진짜' 방송사고" },
    { id: 2, title: "연예인 전화연결, '의외의 고백'에 박명수 폭소" },
    { id: 3, title: "'오늘만큼은 진지하게' 박명수, 인생 조언 대방출" },
    { id: 4, title: "청취자 항의 문자에 박명수, 의외의 대답으로 현장 '폭소'" },
    { id: 5, title: "'내가 이런 말까지 하게 될 줄이야' 박명수의 속마음" },
    { id: 6, title: "박명수, 사연 읽다가 갑자기 울컥한 이유는?" },
    { id: 7, title: "라디오쇼 역사상 '최악의 방송사고', 그날의 진실" },
    { id: 8, title: "박명수 추천 맛집, 실제로 가봤더니 벌어진 일" },
    { id: 9, title: "청취자 깜짝 만남, '라디오쇼 팬미팅' 현장 공개" },
    { id: 10, title: "'연예계 폭로전'…게스트가 밝혀낸 충격 사생활" },
    { id: 11, title: "라디오쇼 최고의 사연, 박명수가 직접 뽑은 TOP5" },
    { id: 12, title: "'한 번만 다시 해주세요' 박명수, 생방송 중 웃픈 실수" },
    { id: 13, title: "게스트 대반전! 방송 중 터진 뜻밖의 폭로" },
    { id: 14, title: "청취자 실시간 참여, 현장서 터진 돌발질문" },
    { id: 15, title: "박명수, 익명 사연에 직접 전화 건 사연의 결말" },
    { id: 16, title: "생방송 중 오열? 박명수의 감동 사연 소개" },
    { id: 17, title: "'라디오쇼는 인생'…청취자 100인의 사연 대공개" },
    { id: 18, title: "박명수, 청취자와 1:1 고민상담 대공개" },
  ] },
  { id: 5, station: "SBS", image:"https://image.cloud.sbs.co.kr/2024/08/02/N9v1722572782483.jpg", date: "2025-05-30", program: "12시엔 주현영", contents: [
    { id: 1, title: "점심시간, 주현영이 쏜다! 청취자 깜짝 도시락 이벤트" },
    { id: 2, title: "'그 시절 우리가 좋아했던'…추억 소환 사연에 눈물바다" },
    { id: 3, title: "현장 대혼란! 실시간 전화연결 중 벌어진 돌발상황" },
    { id: 4, title: "주현영, 오늘만은 진지하게…청취자 고민에 직접 답하다" },
    { id: 5, title: "12시엔 주현영, 역대급 시청률 경신의 비밀" },
    { id: 6, title: "'회사 몰래 라디오 듣다' 딱 걸린 직장인 청취자 사연" },
    { id: 7, title: "게스트 대반전! 주현영도 깜짝 놀란 '특급 게스트' 등장" },
    { id: 8, title: "점심시간 사연왕, 선물 대방출의 현장" },
    { id: 9, title: "오늘 점심 뭐 먹지? 청취자 추천 맛집 지도 공개" },
    { id: 10, title: "주현영이 뽑은 '최고의 점심메이트'…팬과의 깜짝 만남" },
    { id: 11, title: "'오늘따라 왜 이렇게 슬프죠?’ 주현영의 위로 메시지" },
    { id: 12, title: "라디오 듣다 갑자기 울컥…직장인 눈물샘 자극 사연" },
    { id: 13, title: "청취자 썸 탄 사연, '점심 데이트의 추억'" },
    { id: 14, title: "실시간 선물 증정, 방송 중 벌어진 사연 선정의 순간" },
    { id: 15, title: "주현영의 숨은 취미 공개! 팬들도 몰랐던 TMI" },
    { id: 16, title: "12시에 터진 우정, 청취자들 ‘점심 인증샷’ 대잔치" },
    { id: 17, title: "팬들이 직접 뽑은 ‘주현영 명언 BEST10" },
  ] },
  // ...
];

const NUM_COLUMNS = 3;
const columns: {
  id: number;
  station: string;
  date: string;
  program: string;
  image: string;
  contents: { id: number; title: string }[];
}[][] = Array.from({ length: NUM_COLUMNS }, () => []);

cards.forEach((card, idx) => {
  columns[idx % NUM_COLUMNS].push(card);
});

console.log(columns);

const Content = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex gap-[20px] bg-backgroundLight p-[40px]">
      {columns.map((col, colIdx) => (
        <div key={colIdx} className="flex-1 flex flex-col gap-[20px]">
          {col.map((card, idx) => (
            <div key={idx} className="flex flex-col w-full bg-white rounded-[10px] px-[22px] py-[14px]">
              <div className="flex w-full border-b border-gray-300 items-center pb-[12px]">
                <img src={card.image} alt={card.program} className="w-[40px] h-[40px] rounded-full" />
                <div className="flex flex-col items-start justify-between ml-[10px] grow">
                  <div className="font-bold text-lg text-gray2 flex-1 leading-[1] cursor-pointer">{card.program}</div>
                  <div className="text-gray9 text-[14px] ">{card.station}</div>
                </div>
                <div className="text-gray9 text-[14px] ">{card.date}</div>
              </div>
              {card.contents.map((content, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(`/player?id=${card.id}&contentId=${content.id}`)}
                  className={
                    "text-gray3 font-semibold py-[8px] text-[14px] cursor-pointer " +
                    (idx !== 0 ? "border-t border-gray-200" : "")
                  }
                >
                  {content.title}
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