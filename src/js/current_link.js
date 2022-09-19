import { refs } from './reference';
const { navList } = refs;

const navListArray = Array.from(navList.children);

function currentLink() {
  navListArray.forEach(el => {
    const navLink = el.firstElementChild;
    if (window.location.href === navLink.href) {
      navLink.classList.add('current');
    } else {
      navLink.classList.remove('current');
    }
  });
}
export default currentLink();
