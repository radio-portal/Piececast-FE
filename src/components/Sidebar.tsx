import { useNavigate } from 'react-router-dom';

const logoClass = "w-[35px] h-[35px] rounded-[10px] border border-gray-200 mr-[10px]";
const itemClass = "flex items-center cursor-pointer";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`
        fixed left-0 h-full z-10 bg-white border-r border-gray-200 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-[220px]
      `}
    >
      <div className="p-6 w-full border-b border-gray-200 flex flex-col items-start">
        <p className="font-bold text-lg">방송사 홈</p>
        <div className="flex flex-col mt-[10px] gap-[8px] w-full">
          <div className={itemClass} onClick={() => navigate('/station')}>
            <img className={logoClass} src="/assets/images/kbs-logo.jpg" />
            <p className="font-medium">KBS</p>
          </div>
          <div className={itemClass} onClick={() => navigate('/station')}>
            <img className={logoClass} src="/assets/images/mbc-logo.jpg" />
            <p className="font-medium">MBC</p>
          </div>
          <div className={itemClass} onClick={() => navigate('/station')}>
            <img className={logoClass} src="/assets/images/sbs-logo.jpg" />
            <p className="font-medium">SBS</p>
          </div>
        </div>
      </div>
      <div className="p-6 w-full border-b border-gray-200 flex flex-col items-start">
        <p className="font-bold text-lg">구독중</p>
        <div className="flex flex-col mt-[10px] gap-[8px] w-full">
          <div className={itemClass}>
            <img className={logoClass} src="/assets/images/cultwoshow.jpg" />
            <p>두시탈출 컬투쇼</p>
          </div>
          <div className={itemClass}>
            <img className={logoClass} src="/assets/images/sbs12n.jpg" />
            <p>12시엔 주현영</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;