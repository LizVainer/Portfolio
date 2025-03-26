import { useEffect, useState } from 'react';
import doorImage from '/src/assets/props/door.png';

const ENTER_RANGE = 50;

const Doors = ({ playerX, onEnter, width, height }) => {
  // ✅ Move DOORS_DATA *inside* the component so it can use props
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
