import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/timer.module.css';
import { useNavigate } from 'react-router-dom';
import getFormattedTime from '../assets/getFormattedTime';

function Timer({ won }) {
  const [time, setTime] = useState(0);
  const [worstTime, setWorstTime] = useState(false);
  const [player, setPlayer] = useState(false);
  const navigate = useNavigate();
  const getWorstTime = async () => {
    try {
      let res = await fetch('https://quaint-grave-woolen.glitch.me/players');
      res = await res.json();
      console.log(res.players[res.players.length - 1].time);
      const worst = res.players[res.players.length - 1].time;
      setWorstTime(worst);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getWorstTime();
  }, []);

  useEffect(() => {
    let interval = null;
    if (!won) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [won]);

  if (won) {
    if (time < worstTime) {
      return (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Congragulations!</h3>
            <p>You did it in {time} seconds</p>
            <p>You got place in leaderboard</p>
            <p>please enter your name</p>
            <input type='text' onInput={(e) => setPlayer(e.target.value)} />
            <button
              onClick={async () => {
                try {
                  const response = await fetch(
                    'https://quaint-grave-woolen.glitch.me/player_add',
                    {
                      method: 'POST',
                      mode: 'cors',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ name: player, time: time }),
                      redirect: 'follow',
                      referrerPolicy: 'no-referrer',
                    }
                  );
                  console.log(response, 2222);
                } catch (err) {
                  console.log(err);
                } finally {
                  navigate('/');
                }
              }}
            >
              Enter
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Congragulations!</h3>
            <p>You did it in {time} seconds</p>
            <button onClick={() => navigate('/')}>Home</button>
          </div>
        </div>
      );
    }
  }
  return <span>Time: {getFormattedTime(time)} seconds</span>;
}

Timer.propTypes = {
  won: PropTypes.bool.isRequired,
};
export default Timer;
