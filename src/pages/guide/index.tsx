const Guide = () => {
  return (
    <div className="max-w-[800px] mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">이용방법 안내</h1>

      <div className="mt-8 py-4 px-6 bg-backgroundLight rounded-lg font-semibold">
        <p className="text-gray-700">
          AI가 요약해주는 클립과 다양한 필터, 요약 토글 기능으로<br />
          원하는 방송을 쉽고 빠르게, 그리고 더 깊이 즐겨보세요!
        </p>
      </div>

      <div className="space-y-6 mt-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">1. 홈에서 오늘의 클립을 한눈에!</h2>
          <p className="text-gray-700">
            메인페이지에서 오늘 각 프로그램별로 AI가 요약한 음악, 사연, 토크 등 다양한 클립(조각)을 한눈에 볼 수 있습니다.
            듣고 싶은 클립을 클릭하면, 해당 방송의 핵심 부분만 빠르게 감상할 수 있어요.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">2. 프로그램별로 더 깊이 탐색</h2>
          <p className="text-gray-700">
            프로그램명을 클릭하면 프로그램 페이지로 이동합니다.
            이곳에서 '전체 회차 보기' 또는 '클립별 보기' 탭을 전환하며,
            원하는 방송 회차나 클립을 자유롭게 탐색할 수 있습니다.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">3. 클립(조각)을 태그로 쉽고 빠르게 필터링</h2>
          <p className="text-gray-700">
            프로그램 페이지와 재생 페이지에서 제공되는 다양한 태그(예: 음악, 사연, 토크, 명장면 등)를 클릭하면
            원하는 유형의 클립(조각)만 골라서 볼 수 있습니다.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">4. 클립(조각) 클릭 시 요약 내용을 토글로 확인</h2>
          <p className="text-gray-700">
            클립 리스트에서 각 조각을 클릭하면,
            해당 클립의 요약/설명 내용이 아래로 펼쳐져 자세한 내용을 바로 확인할 수 있습니다.
            다시 클릭하면 요약 내용이 닫혀서 화면이 깔끔하게 유지돼요.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">5. 재생 페이지에서 클립(조각) 단위로 바로 재생</h2>
          <p className="text-gray-700">
            player 페이지에서는 한 회차(방송) 내의 클립 리스트가 제공되며,
            원하는 조각(클립)을 클릭하면 그 부분부터 바로 재생할 수 있습니다.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">6. 방송국 홈에서 다양한 프로그램 만나기</h2>
          <p className="text-gray-700">
            햄버거 메뉴(≡)를 클릭하면 방송국 홈으로 이동할 수 있습니다.
            방송국 홈에서는 각 방송국의 다양한 프로그램 목록이 제공되어
            관심 있는 프로그램을 더 쉽게 찾고 탐색할 수 있습니다.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">7. 언제든 하단 플레이어로 제어</h2>
          <p className="text-gray-700">
            방송을 듣는 동안 하단에 항상 보이는 오디오 플레이어 바에서
            재생/일시정지, 볼륨, 현재 재생 위치 등 편리하게 컨트롤할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Guide;