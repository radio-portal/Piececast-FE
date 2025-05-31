import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('spotify_access_token');
      if (!token) return;

      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserName(data.display_name);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    console.log(userName);
  }, [userName]);

  return (
    <header className="fixed top-0 z-10 flex bg-white h-[60px] min-h-[60px] border-b border-gray-200 w-full items-center px-6">
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
      <div className="flex items-center ml-auto">
        {userName && <p className="mr-4"><b>{userName}</b>님</p>}
        <span onClick={() => navigate('/login')} className="material-symbols-outlined ml-[10px] cursor-pointer">account_circle</span>
      </div>
    </header>
  )
}

export default Header;
