import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import GameScene from './GameScene';
import Skills from './Skills';
import Aboutme from './Aboutme';
import Projects from './Projects';
import Achivments from './Achivments';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameScene />} />
        <Route path="/Skills" element={<Skills />} />
        <Route path="/Aboutme" element={<Aboutme />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Achivments" element={<Achivments />} />
      </Routes>
    </Router>
  );
}

export default App;
