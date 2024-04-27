import styles from '../styles/game.module.css';

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

          const target = document.createElement('div');
          target.classList.add('target');
          target.style.position = 'absolute';
          target.style.left = x - 15 + 'px';
          target.style.top = y - 15 + 'px';

          setTimeout(() => {
            console.log(target.getBoundingClientRect().width);
          }, 0);

          e.currentTarget.append(target);
        }}
        className={styles.container}
      >
        <img src='/test.jpg' alt='image of waldo' className={styles.img} />

        <div className={styles.target}></div>
      </div>
    </div>
  );
}

export default Game;
