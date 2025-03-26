import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import GameScene from './GameScene';
import Skills from './Skills';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameScene />} />
        <Route path="/Skills" element={<Skills />} />
      </Routes>
    </Router>
  );
}

export default App;
