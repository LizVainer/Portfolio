import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import GameScene from './GameScene';
import NextScene from './NextScene';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameScene />} />
        <Route path="/next" element={<NextScene />} />
      </Routes>
    </Router>
  );
}

export default App;
