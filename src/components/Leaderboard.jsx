import { useEffect } from 'react';
import { useState } from 'react';
import styles from '../styles/leaderboard.module.css';
import Loading from '../components/Loading';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState(false);
  const getLeaderboard = async () => {
    try {
      let res = await fetch('https://quaint-grave-woolen.glitch.me/players');
      res = await res.json();
      console.log(res.players);
      setLeaderboard(res.players);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getLeaderboard();
  }, []);

  return (
    <div>
      <h3>Leaders Are:</h3>
      <ul className={styles.ul}>
        {leaderboard ? (
          leaderboard.map((player, index) => {
            return (
              <li key={index} className={styles.li}>
                <span>{player.name}</span> <span>{player.time}</span>
              </li>
            );
          })
        ) : (
          <Loading />
        )}
      </ul>
    </div>
  );
}

export default Leaderboard;
