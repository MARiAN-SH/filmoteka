import { refs } from './reference';
import { getById, delMmovie } from './localStorageApi';
import filmCardTemplate from './templates/modal-film-card.hbs';

const {
  openFilmModal,
  closeFilmModal,
  closeFilmModalBtn,
  filmModal,
  filmCard,
  modalFilm,
} = refs;

let filmId = '';

function openFilmModalFn() {
  filmModal.classList.remove('is-hidden');
  closeFilmModal.addEventListener('click', closeFilmModalFn);
  closeFilmModalBtn.addEventListener('click', closeFilmModalFn);
  window.addEventListener('keydown', closeFilmModalFn);
  delMmovie();
}

function closeFilmModalFn(e) {
  if (e.target === closeFilmModal || e.currentTarget === closeFilmModalBtn) {
    filmModal.classList.add('is-hidden');
    document.querySelector('body').classList.remove('no-scroll');

    return;
  } else if (e.key === 'Escape') {
    filmModal.classList.add('is-hidden');
    window.removeEventListener('keydown', closeFilmModalFn);

    // пропадає scroll bar ??? якщо закоментовано
    // document.querySelector('body').classList.remove('no-scroll');
  }
}

function renderFilmInfo(filmData) {
  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies'));
  const moviesInQueue = JSON.parse(localStorage.getItem('moviesInQueue'));
  const markup = filmCardTemplate(filmData);

  filmCard.innerHTML = markup;
  const watchedButton = filmCard.querySelector('#watched');
  if (watchedMovies.find(element => element.id === Number(filmId))) {
    watchedButton.textContent = 'REMOVE FROM WATCHED';
  }
  const queuedButton = filmCard.querySelector('#queue');
  if (moviesInQueue.find(element => element.id === Number(filmId))) {
    queuedButton.textContent = 'REMOVE FROM QUEUE';
  }

  return Promise.resolve();
}

function onCardClick(event) {
  event.stopPropagation();
  document.querySelector('body').classList.add('no-scroll');

  if (event.target.className === 'img') {
    filmId = event.target.getAttribute('id');
    filmId && showFilmInfo(filmId);
    modalFilm.id = filmId;
    openFilmModalFn();
  }
}

function showFilmInfo(movieId) {
  getById(movieId)
    .then(renderFilmInfo)
    .then(openFilmModalFn)
    .catch(console.log);
}

export default openFilmModal.addEventListener('click', onCardClick);
