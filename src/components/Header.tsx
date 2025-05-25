import { useNavigate } from "react-router-dom";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 flex bg-white h-[60px] border-b border-gray-200 w-full items-center px-6">
      <span className="material-symbols-outlined cursor-pointer mr-2" onClick={onMenuClick}>menu</span>
      <img 
        src="/assets/images/logo.svg" 
        alt="logo" 
        className="h-[35px] cursor-pointer" 
        onClick={() => navigate('/')}
      />
      <input 
        type="text" 
        placeholder="프로그램명, 코너명, DJ명을 검색해보세요." 
        className="w-[480px] h-[35px] text-sm px-4 rounded-full ml-[60px] border border-gray-200 px-2" 
      />
      <span className="material-symbols-outlined cursor-pointer ml-[-35px]">search</span>
      <p className="ml-auto"><b>전규리</b>님</p>
      <span className="material-symbols-outlined ml-[10px] cursor-pointer">account_circle</span>
    </header>
  )
}

export default Header;
