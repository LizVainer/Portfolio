import terrain from '/src/assets/background/terrain.png';

const Ground = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100vw',
        height: '64px', 
        backgroundImage: `url(${terrain})`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: '64px 64px', 
        zIndex: 2,
      }}
    />
  );
};

export default Ground;
