import { refs } from './reference';

const { moviesList } = refs;


export function addEfectRenderer() {
  for (let i = 0; i < moviesList.children.length; i++) {
    const indexChild = moviesList.children[i];
    if (window.innerWidth > 768) {
      indexChild.setAttribute('data-aos', 'zoom-in');
    } else if (i % 2 == 0) {
      indexChild.setAttribute('data-aos', 'fade-right');
    } else {
      indexChild.setAttribute('data-aos', 'fade-left');
    }
  }
}
