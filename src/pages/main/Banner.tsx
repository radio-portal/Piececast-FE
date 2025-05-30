const Banner = () => {
  return (
    <div className="w-full h-[200px] flex justify-between px-[100px] items-center bg-gradient-to-r from-[#4F6FCB] via-[rgba(59,83,152,0.94)] to-[rgba(39,55,101,0.92)]">
      <div className="flex flex-col text-white">
        <p className="font-bold text-[40px]">AI가 요약해주는 라디오!</p>
        <div className="flex items-center gap-[20px]">
          <p className="text-[22px] font-semibold mt-[4px]">음악, 사연, 토크까지 한눈에! 놓친 방송, 핵심만 빠르게 듣자!</p>
          <img src="/assets/images/bannerArrow.png" alt="arrow" />
        </div>
        <button className="bg-gray2 w-[130px] h-[30px] rounded-full text-[14px] font-semibold text-center mt-[20px]">이용방법 안내</button>
      </div>
      <div className="flex items-center">
        <img src="/assets/images/character2.png" alt="character" className="h-[100px] rounded-[5px] mt-[55px]" />
        <img src="/assets/images/character.png" alt="character" className="h-[130px] rounded-[5px] rotate-[10deg] mt-[30px]" />
      </div>
    </div>
  )
}

export default Banner;