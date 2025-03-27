import { useEffect, useState } from 'react';

import idle1 from '/src/assets/character/idle1.png';
import idle2 from '/src/assets/character/idle2.png';
import idle3 from '/src/assets/character/idle3.png';
import idle4 from '/src/assets/character/idle4.png';

import run1 from '/src/assets/character/run1.png';
import run2 from '/src/assets/character/run2.png';
import run3 from '/src/assets/character/run3.png';
import run4 from '/src/assets/character/run4.png';
import run5 from '/src/assets/character/run5.png';

const idleFrames = [idle1, idle2, idle3, idle4];
const runFrames = [run1, run2, run3, run4, run5];

const JUMP_FORCE = -45;
const GRAVITY = 4;
const CHARACTER_WIDTH = 128;
const CHARACTER_HEIGHT = 128;

const Character = ({ onMove, windowHeight, platforms }) => {
  const GROUND_Y = windowHeight - 120;

  const [position, setPosition] = useState({ x: 100, y: GROUND_Y - 50 });
  const [frame, setFrame] = useState(0);
  const [direction, setDirection] = useState('right');
  const [isWalking, setIsWalking] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [velocityY, setVelocityY] = useState(0);
  const [keys, setKeys] = useState({ left: false, right: false });

  // Handle key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setKeys((k) => ({ ...k, right: true }));
        setDirection('right');
      }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setKeys((k) => ({ ...k, left: true }));
        setDirection('left');
      }
      if ((e.key === ' ' || e.code === 'Space') && !isJumping) {
        setIsJumping(true);
        setVelocityY(JUMP_FORCE);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setKeys((k) => ({ ...k, right: false }));
      }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setKeys((k) => ({ ...k, left: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isJumping]);

  // Movement & gravity + platform collision
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition((pos) => {
        let newX = pos.x;
        let newY = pos.y;
        let velY = velocityY;
        let moved = false;

        // Horizontal movement
        if (keys.right) {
          newX += 10;
          moved = true;
        }
        if (keys.left) {
          newX -= 10;
          moved = true;
        }

        // Gravity & jump
        if (isJumping) {
          velY += GRAVITY;
          newY += velY;

          // Check for platform collision
          for (const plat of platforms) {
            const isAbove = pos.y + CHARACTER_HEIGHT <= plat.y;
            const willFallThrough = newY + CHARACTER_HEIGHT >= plat.y;
            const horizontallyAligned =
            newX + CHARACTER_WIDTH > plat.x &&
            newX < plat.x + plat.width;

            if (isAbove && willFallThrough && horizontallyAligned) {
              newY = plat.y - CHARACTER_HEIGHT;
              velY = 0;
              setIsJumping(false);
              break;
            }
          }

          // Ground collision
          if (newY >= GROUND_Y - 50) {
            newY = GROUND_Y - 50;
            velY = 0;
            setIsJumping(false);
          }

          setVelocityY(velY);
        }

        setIsWalking(moved && !isJumping);
        return { x: newX, y: newY };
      });
    }, 20);

    return () => clearInterval(moveInterval);
  }, [keys, isJumping, velocityY, GROUND_Y, platforms]);

  // Notify parent of x movement
  useEffect(() => {
    if (onMove) onMove(position.x);
  }, [position.x]);

  // Frame animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => {
        const frames = isWalking ? runFrames : idleFrames;
        return (prev + 1) % frames.length;
      });
    }, isWalking ? 100 : 300);

    return () => clearInterval(interval);
  }, [isWalking]);

  const currentFrame =
    isJumping || !isWalking
      ? (isWalking ? runFrames : idleFrames)[frame]
      : (isWalking ? runFrames : idleFrames)[frame];

  return (
    <img
      src={currentFrame}
      alt="character"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${CHARACTER_WIDTH}px`,
        height: `${CHARACTER_HEIGHT}px`,
        transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
        transformOrigin: 'bottom center',
        imageRendering: 'pixelated',
        zIndex: 3,
      }}
      onError={(e) => {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', currentFrame);
      }}
    />
  );
};

export default Character;
