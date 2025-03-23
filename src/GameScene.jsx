import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Character from './Character';
import Ground from './Ground';
import Doors from './Doors';
import cloudsBackground from '/src/assets/background/clouds_background.jpg';

function GameScene() {
  const [playerX, setPlayerX] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  const handleEnter = () => {
    setFadeOut(true);
    setTimeout(() => navigate('/next'), 1000); // 🔁 goes to /next route
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: `url(${cloudsBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'opacity 1s ease-in-out',
        opacity: fadeOut ? 0 : 1,
        position: 'relative',
      }}
    >
      <Doors playerX={playerX} onEnter={handleEnter} />
      <Ground />
      <Character onMove={(x) => setPlayerX(x)} />
    </div>
  );
}

export default GameScene;
