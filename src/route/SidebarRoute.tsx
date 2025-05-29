import { Header, Sidebar } from '@/components';
import { Outlet } from 'react-router-dom';

interface SidebarLayoutProps {
  isSidebarOpen: boolean;
  onMenuClick: () => void;
}

const SidebarRoute = ({ isSidebarOpen, onMenuClick }: SidebarLayoutProps) => (
  <>
    <Header onMenuClick={onMenuClick} />
    <div className="flex top-[60px]">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className={`transition-all duration-300 flex-1 ${isSidebarOpen ? 'ml-[220px]' : 'ml-0'}`}
        style={{ minHeight: '100vh' }}
      >
        <Outlet />
      </div>
    </div>
  </>
);

export default SidebarRoute; 