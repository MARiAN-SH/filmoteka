import { Loading } from 'notiflix/build/notiflix-loading-aio';

export function loadingOn() {
  Loading.standard('Loading...', {
    svgColor: '#ff6b01',
    messageColor: '#ff6b01',
    backgroundColor: 'none',
  });
}

export function loadingOff() {
  Loading.remove();
}
