import './js/current_link';
import { refs } from './js/reference';
import {
  checkLocalStorageOnwatch,
  checkLocalStorageOnQueue,
} from './js/localStorageApi';
import { loadingOn, loadingOff } from './js/loading';
import { renderCollection } from './js/templates/movieTemplate';
import { addEfectRenderer } from './js/effect_for_cart';

// відкриття модалки в бібліотеці
import './js/film-modal';

// import { openTeamModal, closeTeamModal } from './js/team-modal';

const { moviesList, watchedBtn, queueBtn } = refs;

// ==============render info page================
function renderInfoPage() {
  moviesList.innerHTML = '';
  const infoPage = document.createElement('strong');
  infoPage.classList.add('info-text');
  infoPage.innerHTML = `No movies selected <a class="info-text__link" href="./index.html">Add a movie</a>`;

  return moviesList.append(infoPage);
}

function renderPage() {
  if (checkLocalStorageOnwatch()) {
    renderInfoPage();
  } else {
    loadingOn();
    moviesList.innerHTML = '';
    const watchObj = JSON.parse(localStorage.getItem('watchedMovies'));
    setTimeout(() => {
      for (let obj of watchObj) {
        renderCollection(obj);
        addEfectRenderer();
      }
      loadingOff();
    }, 500);
  }
}

function clickOnWatchedBtn() {
  watchedBtn.classList.add('current');
  queueBtn.classList.remove('current');

  renderPage();
}

function clickOnQueueBtn() {
  watchedBtn.classList.remove('current');
  queueBtn.classList.add('current');

  if (checkLocalStorageOnQueue()) {
    renderInfoPage();
  } else {
    loadingOn();
    moviesList.innerHTML = '';
    const queueObj = JSON.parse(localStorage.getItem('moviesInQueue'));

    setTimeout(() => {
      for (let obj of queueObj) {
        renderCollection(obj);
        addEfectRenderer();
      }
      loadingOff();
    }, 300);
  }
}

renderPage();

watchedBtn.addEventListener('click', clickOnWatchedBtn);
queueBtn.addEventListener('click', clickOnQueueBtn);
