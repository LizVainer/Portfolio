import { useEffect, useState } from 'react';
import doorImage from '/src/assets/props/door.png';
import terrain from '/src/assets/background/terrain.png';
const ENTER_RANGE = 50;

const Doors = ({ playerX, onEnter, width, height }) => {
  const DOORS_DATA = [
    { id: 'Skills', x: 300, y: height - 222 },
    { id: 'Projects', x: width - 200, y: height - 222 },
    { id: 'About me', x: 600, y: height - 400 },
    { id: 'Achivments', x: 1000, y: height - 500 },
  ];

  return (
    <>
      {DOORS_DATA.map((door) => (
        <DoorInstance
          key={door.id}
          door={door}
          playerX={playerX}
          onEnter={() => onEnter(door.id)}
        />
      ))}
    </>
  );
};

const DoorInstance = ({ door, playerX, onEnter }) => {
  const [isNear, setIsNear] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isElevated = door.id === 'About me' || door.id === 'Achivments';

  useEffect(() => {
    const distance = Math.abs(playerX - door.x);
    setIsNear(distance < ENTER_RANGE);
  }, [playerX, door.x]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isNear && e.key.toLowerCase() === 'e') {
        onEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isNear, onEnter]);

  return (
    <>
      {/* Door label */}
      <div
        style={{
          position: 'absolute',
          left: `${door.x + 64}px`,
          top: `${door.y - 60}px`,
          transform: 'translateX(-50%)',
          color: 'white',
          fontFamily: `'MedievalSharp', cursive`,
          fontSize: '36px',
          textShadow: '1px 1px 2px black',
          pointerEvents: 'none',
          zIndex: 4,
        }}
      >
        {door.id}
      </div>

      {/* Platform under elevated doors */}
      {isElevated && (
  <div
    style={{
      position: 'absolute',
      left: `${door.x}px`,
      top: `${door.y + 160}px`, // directly under the door image
      width: '128px',
      height: '64px',
      backgroundImage: `url(${terrain})`,
      backgroundSize: 'cover',
      zIndex: 1,
    }}
  />
)}

      {/* Door image */}
      <img
        src={doorImage}
        alt={`door-${door.id}`}
        onDoubleClick={onEnter}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'absolute',
          left: `${door.x}px`,
          top: `${door.y}px`,
          width: '128px',
          height: '160px',
          zIndex: 2,
          cursor: 'pointer',
        }}
      />

      {/* Tooltip */}
      {(isNear || isHovered) && (
        <div
          style={{
            position: 'absolute',
            left: `${door.x + 64}px`,
            top: `${door.y + 170}px`,
            transform: 'translateX(-50%)',
            color: 'white',
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '4px 8px',
            fontSize: '14px',
            borderRadius: '4px',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          {isNear ? 'Press E or Double-Click to Enter' : 'Double Click to Enter'}
        </div>
      )}
    </>
  );
};

export default Doors;
