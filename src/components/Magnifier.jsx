import styles from '../styles/magnifier.module.css';

function Magnifier() {
  let img, lens, result, cx, cy;

  document.addEventListener('DOMContentLoaded', () => {
    img = document.getElementById('img');
    result = document.getElementById('result');
    lens = document.getElementById('lens');

    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;

    result.style.backgroundImage = `url('${img.src}')`;
    result.style.backgroundSize =
      img.width * cx + 'px ' + img.height * cy + 'px';

    function moveLens(e) {
      let x, y;
      e.preventDefault();

      x = e.clientX - lens.offsetWidth / 2;
      y = e.clientY - lens.offsetHeight / 2;

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

      result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    }

    lens.addEventListener('mousemove', moveLens);
    img.addEventListener('mousemove', moveLens);
  });

  return (
    <div>
      <p>not implemented</p>
      <div id='result' className={styles.result}></div>
      <div id='lens' className={styles.lens}></div>
    </div>
  );
}

export default Magnifier;
