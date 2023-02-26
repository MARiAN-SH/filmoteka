import { refs } from '../reference';

const { closeModal, closeModalBtn, modal, contextModal, modalFilm } = refs;

export function openModalFn() {
  modal.classList.remove('is-hidden');
  closeModal.addEventListener('click', closeModalFn);
  closeModalBtn.addEventListener('click', closeModalFn);
  window.addEventListener('keydown', closeModalFn);
  modalFilm.style.transform = 'translate(-50%, -50%) scale(1)';
  modalFilm.style.transition = 'all 1.9s  ease-in-out';
}

export function closeModalFn(e) {
  const infoAuth = document.querySelector('.infoAuth');
  if (e.target === closeModal || e.currentTarget === closeModalBtn) {
    modal.classList.add('is-hidden');
    document.querySelector('body').classList.remove('no-scroll');

    infoAuth && contextModal.lastElementChild.remove();
    modalFilm.style = false;
    return;
  } else if (e.key === 'Escape') {
    modal.classList.add('is-hidden');
    window.removeEventListener('keydown', closeModalFn);
    document.querySelector('body').classList.remove('no-scroll');

    infoAuth && contextModal.lastElementChild.remove();
  }
}
