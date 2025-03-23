import Character from './Character';
import Ground from './Ground';
import cloudsBackground from '/src/assets/background/clouds_background.jpg';
function App() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: `url(${cloudsBackground})`,
     
      }}
    >
      <Ground />
      <Character />
    </div>
  );
}

export default App;
