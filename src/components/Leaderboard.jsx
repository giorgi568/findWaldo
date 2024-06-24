import { useEffect } from 'react';
import { useState } from 'react';
import styles from '../styles/leaderboard.module.css';
import Loading from './Loading';
import getFormattedTime from '../assets/getFormattedTime';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState(false);
  const getLeaderboard = async () => {
    try {
      let res = await fetch('https://quaint-grave-woolen.glitch.me/players');
      res = await res.json();
      setLeaderboard(res.players);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getLeaderboard();
  }, []);

  return (
    <div className={styles.wrapper}>
      <img src='peeking.png' alt='peek' className={styles.img} />
      <div className={styles.container}>
        <h3>Leaderboard</h3>
        <ul className={styles.ul}>
          {leaderboard ? (
            leaderboard.map((player, index) => {
              return (
                <li key={index} className={styles.li}>
                  <span>{player.name}</span>
                  <hr className={styles.dottedLine} />
                  <span>{getFormattedTime(player.time)}</span>
                </li>
              );
            })
          ) : (
            <Loading />
          )}
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
