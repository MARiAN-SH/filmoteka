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
  openModal: document.querySelector('[data-modal-open]'),
  closeModal: document.querySelector('[data-modal-close]'),
  closeModalBtn: document.querySelector('[data-modal-close-btn]'),
  modal: document.querySelector('[data-film-modal]'),
  filmCard: document.querySelector('[data-film-card]'),
  modalFilm: document.querySelector('.modal-film'),
  contextModal: document.querySelector('.modal-inner'),
};
