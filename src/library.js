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
import './js/profile';

// import { openTeamModal, closeTeamModal } from './js/team-modal';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const { moviesList, watchedBtn, queueBtn } = refs;
const user = localStorage.getItem('user');
// ==============render info page================
function renderInfoPage() {
  moviesList.innerHTML = '';
  const infoPage = document.createElement('strong');
  infoPage.classList.add('info-text');
  if (user) {
    infoPage.innerHTML = `No movies selected <a class="info-text__link" href="./index.html">Add a movie</a>`;
  } else {
    infoPage.innerHTML = `To add a movie to the library, authorize`;
  }

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
