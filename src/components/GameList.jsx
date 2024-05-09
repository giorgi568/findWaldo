import { useEffect, useState } from 'react';
import Loading from './Loading';
import styles from '../styles/gameList.module.css';
import { useNavigate } from 'react-router-dom';

function GameList() {
  const [images, setImages] = useState(false);
  const navigate = useNavigate();

  const getImages = async () => {
    try {
      let res = await fetch('https://quaint-grave-woolen.glitch.me/images/');
      res = await res.json();
      setImages(res.images);
      console.log(res.images);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getImages();
  }, []);
  return (
    <div className={styles.content}>
      {images ? (
        images.map((image, index) => {
          return (
            <div
              key={index}
              className={styles.container}
              onClick={() => navigate(`/game/${image._id}`)}
            >
              <img src={image.url} alt='image' className={styles.img} />
              <div className={styles.wrapper}>
                <p>{image.title}</p>
              </div>
            </div>
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default GameList;
