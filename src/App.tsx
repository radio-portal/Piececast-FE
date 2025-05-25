import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Main, Station } from './pages';
import { SidebarRoute } from './route';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SidebarRoute isSidebarOpen={isSidebarOpen} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />}>
          <Route path="/" element={<Main />} />
          <Route path="/station" element={<Station />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
