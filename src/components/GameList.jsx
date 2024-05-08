import { useEffect, useState } from 'react';
import Loading from './Loading';

function GameList() {
  const [images, setImages] = useState(false);

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
    <div>
      {images ? (
        images.map((image, index) => {
          return (
            <img src={image.url} alt='image' key={index} />
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default GameList;
