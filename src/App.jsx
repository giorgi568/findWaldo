import './App.css';
import Leaderboard from './components/Leaderboard';
import GameList from './components/GameList';

function App() {
  return (
    <>
      <div className='content'>
        <h1>Lets Find Waldo</h1>
        <Leaderboard />
        <GameList />
      </div>
    </>
  );
}

export default App;
