export const formSignIn = signUp => `
  <strong class="title-form">${signUp ? 'Register' : 'Login'}</strong>
  <form class="auth-form" action="">
      ${
        signUp
          ? '<label for=""><input type="text" name="name" placeholder="name"/></label>'
          : ''
      }
    <label for="">
      <input type="email" name="email" placeholder="email"/>
    </label>
    <label for="">
      <input type="password" name="pass" placeholder="password"/>
    </label>
  </form>
   <ul class='form_btns'>
    <li>
      <button class="modal-film__btn btnSendForm" type="submit">
      ${signUp ? 'register' : 'Login'}
      </button>
    </li>
    <li><button class="modal-film__btn btnGoogleAuth" type="submit">Goggle</button></li>
    </ul>
    <p id='error'></p>
    `;
