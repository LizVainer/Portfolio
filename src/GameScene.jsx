import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Character from './Character';
import Ground from './Ground';
import Doors from './Doors';
import cloudsBackground from '/src/assets/background/clouds_background.jpg';
import useWindowSize from './useWindowSize';

function GameScene() {
  const [playerX, setPlayerX] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();
  const { width, height } = useWindowSize(); 

  const handleEnter = (doorId) => {
    setFadeOut(true);
    setTimeout(() => {
      if (doorId === 'Skills') {
        navigate('/Skills');
      } else if (doorId === 'Projects') {
        navigate('/Projects');
      } else if (doorId === 'About me') {
        navigate('/Aboutme');
      } else if (doorId === 'Achivments') {
        navigate('/Achivments');
      } else {
        navigate('/');
      }
    }, 1000);
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
      <Doors playerX={playerX} onEnter={handleEnter} width={width} height={height} />
      <Ground height={64} />

      <Character onMove={(x) => setPlayerX(x)} windowHeight={height} />

    </div>
  );
}

export default GameScene;
