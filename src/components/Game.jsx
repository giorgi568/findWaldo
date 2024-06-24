import { useEffect, useState } from 'react';
import styles from '../styles/game.module.css';
import Magnifier from './Magnifier';
import Timer from './Timer';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

function Game() {
  const [showMagnifier, letShowMagnifier] = useState(false);
  const [image, setimage] = useState(false);
  const { id } = useParams();
  let guessX, guessY;
  const [waldoFound, setWaldoFound] = useState(false);
  const [wendaFound, setWendaFound] = useState(false);
  const [won, setWon] = useState(false);
  const navigate = useNavigate()

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

  // if (won) {
  //   return <h1>Congragulations your time was {time} seconds</h1>;
  // }
  if(!image) {
    return(
      <Loading />
    )
  }
  return (
    <div className={styles.content}>
      <img src='/hi.png' alt='hi' className={styles.hi} onClick={() => navigate('/')}/>
      {image.cordX_wenda ? (
        <p>Find Waldo And Wenda To Win</p>
      ) : (
        <p>Find Waldo To Win</p>
      )}

      <div className={styles.contentWrapper}>
        <div className={styles.wrapper}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.stopPropagation();
              e.target.classList.toggle(styles.checked);
              letShowMagnifier(!showMagnifier);
            }}
            className={styles.btn}
          >
            Magnifier
            <img
              src='/magnifying-glass.png'
              alt='magnifier'
              onClick={(e) => {
                // this is so that img doesnt get checked class instead of button
                e.stopPropagation();
                e.currentTarget.closest('button').click();
              }}
            />
            
          </button>
          <div>
            <Timer won={won} />
          </div>
        </div>
        <div
          id='container'
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
            options.style.display = 'flex';
            if (x + target.offsetWidth + options.offsetWidth > rect.width) {
              options.style.left =
                x - target.offsetWidth - options.offsetWidth + 'px';
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
            {!waldoFound && (
              <span>
                <img
                  src='/waldo.png'
                  alt='waldo'
                  className={styles.profileImg}
                  onClick={async (e) => {
                    try {
                      //clearing options and target
                      const options = document.getElementById('options');
                      const target = document.getElementById('target');
                      options.style.display = 'none';
                      target.style.display = 'none';

                      const foundLabel = document.getElementById('foundLabel');
                      foundLabel.style.visibility = 'visible';
                      
                      const container = document.getElementById('container');
                      let rect = container.getBoundingClientRect();
                      const x = e.clientX - rect.left - 100;
                      const y = e.clientY - rect.top;

                      foundLabel.style.left = `${x}px`;
                      foundLabel.style.top = `${y}px`;

                      let res = await fetch(
                        `https://quaint-grave-woolen.glitch.me/found_waldo/${id}?x=${guessX}&y=${guessY}`
                      );
                      res = await res.json();
                      if (res.found === true) {
                        foundLabel.innerText =
                          'Congragulations You Found Waldo';
                        setWaldoFound(true);
                      } else {
                        foundLabel.innerText = 'No Luck';
                      }

                      //make label dissaper after few seconds
                      setTimeout(() => {
                        foundLabel.innerText = '';
                        foundLabel.style.visibility = 'hidden';
                      }, 2000);
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                />
              </span>
            )}{' '}
            {!wendaFound && (
              <span>
                <img
                  src='/wenda.jpg'
                  alt='wenda'
                  className={styles.profileImg}
                  onClick={async (e) => {
                    try {
                      //clearing options and target
                      const options = document.getElementById('options');
                      const target = document.getElementById('target');
                      options.style.display = 'none';
                      target.style.display = 'none';

                      const foundLabel = document.getElementById('foundLabel');
                      foundLabel.style.visibility = 'visible';

                      const container = document.getElementById('container');
                      let rect = container.getBoundingClientRect();
                      const x = e.clientX - rect.left - 100;
                      const y = e.clientY - rect.top;

                      foundLabel.style.left = `${x}px`;
                      foundLabel.style.top = `${y}px`;

                      let res = await fetch(
                        `https://quaint-grave-woolen.glitch.me/found_wenda/${id}?x=${guessX}&y=${guessY}`
                      );
                      res = await res.json();
                      if (res.found === true) {
                        setWendaFound(true);
                        foundLabel.innerText =
                          'Congragulations You Found Wenda';
                      } else {
                        foundLabel.innerText = 'No Luck';
                      }

                      //make label dissaper after few seconds
                      setTimeout(() => {
                        foundLabel.innerText = '';
                        foundLabel.style.visibility = 'hidden';
                      }, 2000);
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                />
              </span>
            )}
          </div>

          <div className={styles.target} id='target'></div>

          <div id='foundLabel' className={styles.foundLabel}></div>

          {showMagnifier && <Magnifier />}
        </div>
      </div>
    </div>
  );
}

export default Game;
