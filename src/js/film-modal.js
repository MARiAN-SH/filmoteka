import { refs } from './reference';
import { getById, delMmovie } from './localStorageApi';
import filmCardTemplate from './templates/modal-film-card.hbs';
import { getByVideo } from './getById';
import { openModalFn } from './modal/modal';
import { openTrailer } from './modal/openTrailer';
import { addMovies } from './addMoviesInLibrary';

import { loadingOn, loadingOff } from './loading';

const { openModal, filmCard, modalFilm } = refs;

let filmId = '';

function renderFilmInfo(filmData) {
  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies'));
  const moviesInQueue = JSON.parse(localStorage.getItem('moviesInQueue'));
  const markup = filmCardTemplate(filmData);

  filmCard.innerHTML = markup;

  if (!localStorage.getItem('user')) {
    PermissionAddMovie();
  } else {
    const watchedButton = filmCard.querySelector('#watched');
    if (watchedMovies.find(element => element.id === Number(filmId))) {
      watchedButton.textContent = 'REMOVE FROM WATCHED';
    }
    const queuedButton = filmCard.querySelector('#queue');
    if (moviesInQueue.find(element => element.id === Number(filmId))) {
      queuedButton.textContent = 'REMOVE FROM QUEUE';
    }
    addMovies(filmData);
  }
  openTrailer(filmData.keyid);
  return Promise.resolve();
}

function PermissionAddMovie() {
  const watched = document.querySelector(`#watched`);
  const queue = document.querySelector(`#queue`);
  watched.setAttribute('disabled', 'disabled');
  queue.setAttribute('disabled', 'disabled');
  filmCard.insertAdjacentHTML(
    'afterend',
    '<p class="infoAuth" style="color:red; margin-top:10px">Go to your profile to add a movie to the library</p>'
  );
}

function onCardClick(event) {
  event.stopPropagation();
  document.querySelector('body').classList.add('no-scroll');

  if (event.target.className === 'img') {
    filmId = event.target.getAttribute('id');
    filmId && showFilmInfo(filmId);
    modalFilm.id = filmId;

    delMmovie();
  }
}

function showFilmInfo(movieId) {
  loadingOn();
  getById(movieId)
    .then(i => {
      getByVideo(i.id).then(id => {
        i = { ...i, keyid: id };
        loadingOff();

        setTimeout(() => {
          openModalFn();
          renderFilmInfo(i);
        }, 500);
      });
    })

    .catch(console.log);
}

export default openModal.addEventListener('click', onCardClick);
