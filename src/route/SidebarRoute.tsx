import { Header, Sidebar } from '@/components';
import { Outlet } from 'react-router-dom';

interface SidebarLayoutProps {
  isSidebarOpen: boolean;
  onMenuClick: () => void;
}

const SidebarRoute = ({ isSidebarOpen, onMenuClick }: SidebarLayoutProps) => (
  <>
    <Header onMenuClick={onMenuClick} />
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className={`transition-all duration-300 flex-1 ${isSidebarOpen ? 'ml-0' : 'ml-[-220px]'}`}
        style={{ minHeight: '100vh' }}
      >
        <Outlet />
      </div>
    </div>
  </>
);

export default SidebarRoute; 