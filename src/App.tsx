import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Main, Station } from './pages';
import { Header, Sidebar } from './components';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/station" element={<Station />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
