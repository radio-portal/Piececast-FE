interface ProgramBannerProps {
  viewType: 'episode' | 'clip' | null;
  onViewTypeChange: (type: 'episode' | 'clip') => void;
}

export const ProgramBanner = ({ viewType, onViewTypeChange }: ProgramBannerProps) => {
  return (
    <div className="w-full h-[144px] bg-lightBlue text-white px-[120px] flex justify-center items-start flex-col gap-[7px]">
      <div className="flex items-center justify-center">
        <img src="https://podcastaddict.com/cache/artwork/thumb/396347" alt="logo" className="w-[80px] h-[80px] rounded-full" />
        <div className="flex flex-col items-start ml-[18px]">
          <div className="flex items-center gap-[10px]">
            <p className="text-[28px] font-bold leading-[30px]">김이나의 별이 빛나는 밤에</p>
            <button className="px-[10px] py-[1px] border border-white rounded-[5px] text-[14px]">구독하기 +</button>
          </div>
          <p className="text-[14px]">방송국 홈페이지 이동</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-[24px]">
        <p 
          className={`cursor-pointer font-semibold ${viewType === 'episode' ? 'text-white' : 'text-gray-300'}`}
          onClick={() => onViewTypeChange('episode')}
        >
          회차별 보기
        </p>
        <p 
          className={`cursor-pointer font-semibold ${viewType === 'clip' ? 'text-white' : 'text-gray-300'}`}
          onClick={() => onViewTypeChange('clip')}
        >
          클립별 보기
        </p>
      </div>
    </div>
  )
}