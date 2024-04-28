import styles from '../styles/game.module.css';
import Magnifier from './Magnifier';

function Game() {
  return (
    <div>
      <p>click on the waldo to win</p>
      <div
        onClick={(e) => {
          e.stopPropagation();

          let rect = e.currentTarget.getBoundingClientRect();
          let x = e.clientX - rect.left;
          let y = e.clientY - rect.top;
          console.log('coordinate x: ' + x, 'coordinate y: ' + y);

          const target = document.getElementById('target');
          target.style.display = 'block';
          target.style.position = 'absolute';
          target.style.left = x - target.offsetWidth/2 + 'px';
          target.style.top = y - target.offsetHeight/2 + 'px';
        }}
        className={styles.container}
      >
        <img src='/test.jpg' alt='image of waldo' className={styles.img} id='img'/>

        <div className={styles.target} id='target'></div>
        <Magnifier />
      </div>
    </div>
  );
}

export default Game;
