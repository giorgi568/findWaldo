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
            <p>You did it in {getFormattedTime(time)}</p>
            <p>You got place in the leaderboard</p>
            <p>please enter your name</p>
            <form action='#'>
              <input
                type='text'
                onInput={(e) => setPlayer(e.target.value)}
                minLength={1}
                placeholder='name'
              />
              <button
                type='button'
                className={styles.btn}
                onClick={async () => {
                  try {
                    if (player) {
                      await fetch(
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
                      navigate('/');
                    }
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                Enter
              </button>
            </form>
            <span>
              <hr />
              OR
              <hr />
            </span>
            <button onClick={() => navigate('/')}>Go To Homepage</button>
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
  return <span className={styles.timer}>{getFormattedTime(time)}</span>;
}

Timer.propTypes = {
  won: PropTypes.bool.isRequired,
};
export default Timer;
