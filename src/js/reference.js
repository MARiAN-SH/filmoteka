export const refs = {
  navList: document.querySelector('.nav__list'),
  moviesList: document.querySelector('.film__list'),
  linkToTeam: document.querySelector('.footer__link'),

  // search
  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('.input'),
  summitButton: document.querySelector('.submit-btn'),

  // library refs
  watchedBtn: document.querySelector('.watched_btn'),
  queueBtn: document.querySelector('.queue_btn'),

  // modal
  openFilmModal: document.querySelector('[data-modal-open]'),
  closeFilmModal: document.querySelector('[data-modal-close]'),
  closeFilmModalBtn: document.querySelector('[data-modal-close-btn]'),
  filmModal: document.querySelector('[data-film-modal]'),
  filmCard: document.querySelector('[data-film-card]'),
  modalFilm: document.querySelector('.modal-film'),
  addToWatchedBtn: document.querySelector('.modal-film'),

  // local storeg
  modalWindowRef: document.querySelector('.modal-film'),
};
//  const { navList, moviesList, watchedBtn, queueBtn, linkToTeam } = refs;
