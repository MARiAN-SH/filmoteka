import { refs } from './reference';
import { openModalFn } from './modal/modal';
const { contextModal } = refs;
import { formSignIn } from './templates/formSignIn';
// import formSignIn from './templates/modalAuth.hbs';

import { authGoogle } from './auth/authGoogle';
import { authUserForm } from './auth/auth';
import { logout } from './auth/logout';

import avatarDefault from '../images/profile/man.png';
const profileBtn = document.querySelector('.profile');
const popup = document.querySelector('.profile__popup');

const user =
  localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

if (user) {
  profileBtn.innerHTML = `<img class="profile-img" src="${
    user.photoUser ? user.photoUser : avatarDefault
  }" alt="${user.name}"/>`;
  popup.innerHTML = `
  <div>${user.email}</div>
  <div data-logout>Logout</div>`;
  document.querySelector('[data-logout]').addEventListener('click', () => {
    logout();
  });
} else {
  popup.innerHTML = `
    <button data-modal-open id="signIn">Signin</button>
    <button data-modal-open id="signUp">Signup</button>`;

  popup.addEventListener('click', e => {
    const btnRegister = e.target.id === 'signUp';
    const btnsAuth = btnRegister || e.target.id === 'signIn';
    if (btnsAuth) {
      openModalFn();
      contextModal.innerHTML = formSignIn(btnRegister);
      authGoogle();
      authUserForm();
    }
  });
}

function openPopup(event) {
  event.stopPropagation();
  popup.classList.add('active');
}

profileBtn.addEventListener('click', openPopup);

window.addEventListener('click', e => {
  if (e.target === popup) return;
  popup.classList.remove('active');
});
