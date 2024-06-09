import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/timer.module.css';

function Timer({ won }) {
  const [time, setTime] = useState(0);

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
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h3>Congragulations!</h3>
          <p>You did it in {time} seconds</p>
        </div>
      </div>
    );
  }
  return <span>Time: {time} seconds</span>;
}

Timer.propTypes = {
  won: PropTypes.bool.isRequired,
};
export default Timer;
