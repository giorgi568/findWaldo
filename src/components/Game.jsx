import { useEffect, useState } from 'react';
import styles from '../styles/game.module.css';
import Magnifier from './Magnifier';
import Timer from './Timer';
import { useParams } from 'react-router-dom';

function Game() {
  const [showMagnifier, letShowMagnifier] = useState(false);
  const [image, setimage] = useState(false);
  const { id } = useParams();
  let guessX, guessY;
  const [waldoFound, setWaldoFound] = useState(false);
  const [wendaFound, setWendaFound] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    async function getImage() {
      try {
        let res = await fetch(
          `https://quaint-grave-woolen.glitch.me/image/${id}`
        );
        res = await res.json();
        setimage(res.image);
        if (!res.image.cordX_wenda) {
          setWendaFound(true);
        }
        console.log(res.image);
      } catch (err) {
        console.log(err);
      }
    }
    getImage();
  }, [id]);

  useEffect(() => {
    if (waldoFound && wendaFound) {
      setWon(true);
    }
  }, [waldoFound, wendaFound]);

  console.log(waldoFound, wendaFound);
  // if (won) {
  //   return <h1>Congragulations your time was {time} seconds</h1>;
  // }
  return (
    <div className={styles.content}>
      <img src='/hi.png' alt='hi' className={styles.hi} />
      {image.cordX_wenda ? (
        <p>Find Waldo And Wenda To Win</p>
      ) : (
        <p>Find Waldo To Win</p>
      )}
      <button
        onClick={() => {
          letShowMagnifier(!showMagnifier);
        }}
      >
        Toggle Magnifier
      </button>

      <div>
        <Timer won={won} />
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();

          let rect = e.currentTarget.getBoundingClientRect();
          let x = e.clientX - rect.left;
          let y = e.clientY - rect.top;
          // console.log(
          //   'coordinate x: ' + (x * 1200) / rect.width,
          //   'coordinate y: ' + (y * 1200) / rect.width
          // );
          guessX = Math.floor((x * 1200) / rect.width);
          guessY = Math.floor((y * 1200) / rect.width);

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
          src={image.url}
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
            <img
              src='/waldo.png'
              alt='waldo'
              className={styles.profileImg}
              onClick={async () => {
                try {
                  // console.log(guessX, guessY);
                  let res = await fetch(
                    `https://quaint-grave-woolen.glitch.me/found_waldo/${id}?x=${guessX}&y=${guessY}`
                  );
                  res = await res.json();
                  if (res.found === true) {
                    setWaldoFound(true);
                  }
                } catch (err) {
                  console.log(err);
                }
              }}
            />
          </span>{' '}
          <span>
            <img
              src='/wenda.jpg'
              alt='wenda'
              className={styles.profileImg}
              onClick={async () => {
                try {
                  let res = await fetch(
                    `https://quaint-grave-woolen.glitch.me/found_wenda/${id}?x=${guessX}&y=${guessY}`
                  );
                  res = await res.json();
                  if (res.found === true) {
                    setWendaFound(true);
                  }
                } catch (err) {
                  console.log(err);
                }
              }}
            />
          </span>
        </div>

        <div className={styles.target} id='target'></div>
        {showMagnifier && <Magnifier />}
      </div>
    </div>
  );
}

export default Game;
