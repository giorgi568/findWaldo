import { useState } from 'react';
import styles from '../styles/game.module.css';
import Magnifier from './Magnifier';

function Game() {
  const [showMagnifier, letShowMagnifier] = useState(false);
  return (
    <div>
      <p>click on the waldo to win</p>
      <button
        onClick={() => {
          letShowMagnifier(!showMagnifier);
        }}
      >
        Toggle Magnifier
      </button>
      <div
        onClick={(e) => {
          e.stopPropagation();

          let rect = e.currentTarget.getBoundingClientRect();
          let x = e.clientX - rect.left;
          let y = e.clientY - rect.top;
          console.log(
            'coordinate x: ' + (x * 1200) / rect.width,
            'coordinate y: ' + (y * 1200) / rect.width
          );

          const target = document.getElementById('target');
          target.style.display = 'block';
          target.style.position = 'absolute';
          target.style.left = x - target.offsetWidth / 2 + 'px';
          target.style.top = y - target.offsetHeight / 2 + 'px';

          const options = document.getElementById('options');
          if (x + target.offsetWidth + options.offsetWidth > rect.width) {
            options.style.left =
              x - target.offsetWidth - options.offsetWidth + 'px';
            console.log(
              rect.width,
              x + target.offsetWidth + options.offsetWidth
            );
          } else {
            options.style.left = x + target.offsetWidth + 'px';
          }
          options.style.top = y - target.offsetHeight + 'px';
        }}
        className={styles.container}
      >
        <img
          src='/test2.jpg'
          alt='image of waldo'
          className={styles.img}
          id='img'
        />
        <div
          className={styles.options}
          id='options'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span>
            <img src='/waldo.png' alt='waldo' className={styles.profileImg} />
          </span>{' '}
          <span>
            <img src='/wenda.jpg' alt='wenda' className={styles.profileImg} />
          </span>
        </div>

        <div className={styles.target} id='target'></div>
        {showMagnifier && <Magnifier />}
      </div>
    </div>
  );
}

export default Game;
