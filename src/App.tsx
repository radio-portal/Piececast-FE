import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Main, Station } from './pages';
import { Header } from './components';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/station" element={<Station />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
