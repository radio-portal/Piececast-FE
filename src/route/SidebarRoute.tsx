import { Header, Sidebar, Player } from '@/components';
import { Outlet } from 'react-router-dom';

interface SidebarLayoutProps {
  isSidebarOpen: boolean;
  onMenuClick: () => void;
}

const SidebarRoute = ({ isSidebarOpen, onMenuClick }: SidebarLayoutProps) => (
  <>
    <Header onMenuClick={onMenuClick} />
    <div className="flex h-[calc(100%-130px)] top-[60px] overflow-scroll">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className={`transition-all duration-300 flex-1 ${isSidebarOpen ? 'ml-[220px]' : 'ml-0'}`}
      >
        <Outlet />
      </div>
    </div>
    <Player />
  </>
);

export default SidebarRoute;