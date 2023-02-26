export function openTrailer(trailerId) {
  const btnPlay = document.querySelector('.btn-play');
  const trailer = document.querySelector('.trailer');
  const btnBack = document.querySelector('.trailer-btnBack');
  const iframe = document.querySelector('.trailer iframe');

  const url = `https://www.youtube.com/embed/${trailerId}`;
  btnPlay.addEventListener('click', () => {
    trailer.classList.add('open');
    iframe.src = `${url}?autoplay=1&mute=1`;
  });
  btnBack.addEventListener('click', () => {
    iframe.src = '';
    trailer.classList.remove('open');
  });
}
