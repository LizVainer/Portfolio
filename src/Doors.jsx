import { useEffect, useState } from 'react';
import doorImage from '/src/assets/props/door.png';

const DOOR_X = window.innerWidth - 200;
const DOOR_Y = window.innerHeight - 222;
const ENTER_RANGE = 50;

const Doors = ({ playerX, onEnter }) => {
  const [isNear, setIsNear] = useState(false);

  // Check if player is near
  useEffect(() => {
    const distance = Math.abs(playerX - DOOR_X);
    setIsNear(distance < ENTER_RANGE);
  }, [playerX]);

  // Handle "E" key press
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
      <img
        src={doorImage}
        alt="door"
        onDoubleClick={() => onEnter()} // 👈 double-click support
        style={{
          position: 'absolute',
          left: `${DOOR_X}px`,
          top: `${DOOR_Y}px`,
          width: '128px',
          height: '160px',
          zIndex: 2,
          cursor: 'pointer', // shows hand on hover
        }}
      />
      {isNear && (
        <div
          style={{
            position: 'absolute',
            left: `${DOOR_X - 10}px`,
            top: `${DOOR_Y - 30}px`,
            color: 'white',
            background: 'rgba(0,0,0,0.7)',
            padding: '4px 8px',
            fontSize: '14px',
            borderRadius: '4px',
            zIndex: 3,
          }}
        >
          Press E or Double-Click to Enter
        </div>
      )}
    </>
  );
};

export default Doors;
