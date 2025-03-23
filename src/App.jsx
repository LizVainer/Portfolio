import Character from './Character';

function App() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#87ceeb', // sky blue
      }}
    >
      <Character />
    </div>
  );
}

export default App;
