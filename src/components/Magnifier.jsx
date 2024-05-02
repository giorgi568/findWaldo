import { useEffect } from 'react';
import styles from '../styles/magnifier.module.css';

function Magnifier() {
  useEffect(() => {
    let img, lens, result, cx, cy;
    lens = document.getElementById('lens');
    img = document.getElementById('img');
    result = document.getElementById('result');

    if (!lens) {
      lens = document.createElement('DIV');
      lens.setAttribute('id', 'lens');
      lens.classList.add(styles.lens);
      img.parentElement.insertBefore(lens, img);
    }

    cx = result.offsetWidth / lens.offsetWidth / 2;
    cy = result.offsetHeight / lens.offsetHeight / 2;

    result.style.backgroundImage = `url('${img.src}')`;
    result.style.backgroundSize =
      img.width * cx + 'px ' + img.height * cy + 'px';

    function moveLens(e) {
      let x, y;
      e.preventDefault();

      x =
        e.pageX -
        lens.offsetWidth / 2 -
        img.getBoundingClientRect().left -
        window.scrollX;
      y =
        e.pageY -
        lens.offsetHeight / 2 -
        img.getBoundingClientRect().top -
        window.scrollY;

      if (x > img.width - lens.offsetWidth) {
        x = img.width - lens.offsetWidth;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > img.height - lens.offsetHeight) {
        y = img.height - lens.offsetHeight;
      }
      if (y < 0) {
        y = 0;
      }

      lens.style.left = x + 'px';
      lens.style.top = y + 'px';

      if (x + result.offsetWidth > img.width) {
        result.style.left = x - result.offsetWidth + 'px';
      } else {
        result.style.left = x + 60 + 'px';
      }
      if(y + result.offsetHeight > img.height){
        result.style.top = y - result.offsetHeight + 'px';
      }else{
        result.style.top = y + 60 + 'px';
      }

      result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    }

    lens.addEventListener('mousemove', moveLens);
    img.addEventListener('mousemove', moveLens);
  });

  return <div id='result' className={styles.result}></div>;
}

export default Magnifier;
