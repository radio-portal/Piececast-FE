export const Banner = () => {
  return (
    <div className="w-full h-[144px] bg-lightBlue text-white px-[120px] flex justify-center items-start flex-col gap-[7px]">
      <div className="flex items-center justify-center">
        <img src="/assets/images/superradio.jpg" alt="logo" className="w-[80px] h-[80px] rounded-full" />
        <div className="flex flex-col items-start ml-[18px]">
          <div className="flex items-center gap-[10px]">
            <p className="text-[28px] font-bold leading-[30px]">하하의 슈퍼라디오</p>
            <button className="px-[10px] py-[1px] border border-white rounded-[5px] text-[14px]">구독하기 +</button>
          </div>
          <p className="text-[14px]">방송국 홈페이지 이동</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-[24px]">
        <p className="cursor-pointer font-semibold">회차별 보기</p>
        <p className="cursor-pointer font-semibold">클립별 보기</p>
      </div>
    </div>
  )
}