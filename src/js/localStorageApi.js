import { getById } from './getById';
import { getGenres } from './getGenres';

import { refs } from './reference';
const { modalFilm } = refs;
let watchedMovies = [];
let moviesInQueue = [];
let movieObj = {};
const user = localStorage.getItem('user');
function getLocalStorageItem(localStorageKey) {
  return localStorage.getItem(`${localStorageKey}`);
}

function localStorageArray(localStorageKey) {
  return JSON.parse(getLocalStorageItem(`${localStorageKey}`));
}

if (getLocalStorageItem('watchedMovies') === null) {
  watchedMovies = [];
} else {
  watchedMovies = localStorageArray('watchedMovies');
}

if (getLocalStorageItem('moviesInQueue') === null) {
  moviesInQueue = [];
} else {
  moviesInQueue = localStorageArray('moviesInQueue');
}

export async function checkLocalStorageGenres() {
  if (getLocalStorageItem('genres') === null) {
    await getGenres().then(({ genres }) => {
      localStorage.setItem('genres', JSON.stringify(genres));
    });
  }
}

function checkLocalStorageOnwatch() {
  if (
    getLocalStorageItem('watchedMovies') === null ||
    localStorageArray('watchedMovies').length === 0
  ) {
    return true;
  }

  return false;
}

function checkLocalStorageOnQueue() {
  if (
    getLocalStorageItem('moviesInQueue') === null ||
    localStorageArray('moviesInQueue').length === 0
  ) {
    return true;
  }

  moviesInQueue = localStorageArray('moviesInQueue');
  return false;
}

let filteredWatchedMovies = [];
let filteredMoviesInQueue = [];

async function onModalWindowClick(e) {
  const movieId = parseInt(e.currentTarget.id);

  if (user) {
    await getById(movieId).then(data => {
      movieObj = data;
    });

    const existWatchObj = watchedMovies.find(option => option.id === movieId);
    const existQueueObj = moviesInQueue.find(option => option.id === movieId);
    if (e.target.id === 'watched') {
      if (existWatchObj === undefined) {
        e.target.textContent = 'REMOVE FROM WATCHED';
        watchedMovies.unshift(movieObj);
      } else {
        e.target.textContent = 'ADD TO WATCHED';
        watchedMovies.splice(watchedMovies.indexOf(existWatchObj), 1);
        location.reload();
      }
    } else if (e.target.id === 'queue') {
      if (existQueueObj === undefined) {
        e.target.textContent = 'REMOVE FROM QUEUE';
        moviesInQueue.unshift(movieObj);
      } else {
        e.target.textContent = 'ADD TO QUEUE';
        moviesInQueue.splice(moviesInQueue.indexOf(existQueueObj), 1);
        location.reload();
      }
    }

    deleteWatchedMoviesDuplicates(watchedMovies);
    deleteMoviesInQueueDuplicates(moviesInQueue);

    localStorage.setItem(
      'watchedMovies',
      JSON.stringify(filteredWatchedMovies)
    );
    localStorage.setItem(
      'moviesInQueue',
      JSON.stringify(filteredMoviesInQueue)
    );
  }
}
function deleteWatchedMoviesDuplicates(movies) {
  filteredWatchedMovies = movies.filter((item, index) => {
    return movies.indexOf(item) === index;
  });
  return filteredWatchedMovies;
}

function deleteMoviesInQueueDuplicates(movies) {
  filteredMoviesInQueue = movies.filter((item, index) => {
    return movies.indexOf(item) === index;
  });
  return filteredMoviesInQueue;
}

function delMmovie() {
  modalFilm.addEventListener('click', onModalWindowClick);
}

export {
  getById,
  checkLocalStorageOnwatch,
  checkLocalStorageOnQueue,
  delMmovie,
};
