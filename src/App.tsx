import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Main, Station, Episode, Program, Guide, Login, Callback } from './pages';
import { MainLayout } from './route';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout isSidebarOpen={isSidebarOpen} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />}>
          <Route path="/" element={<Main />} />
          <Route path="/station" element={<Station />} />
          <Route path="/episode/:episodeId/:pieceId" element={<Episode />} />
          <Route path="/program" element={<Program />} />
          <Route path="/guide" element={<Guide />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
