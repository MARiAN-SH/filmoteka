import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import db from '../../firebase/config';

const auth = getAuth(db);

const addUserInFirestore = async user => {
  await db.firestore().collection('users').doc(user.id).set(user);
};

const dataUserForm = {};

const getValueFormAuth = () => {
  document.querySelector('.auth-form').addEventListener('input', e => {
    dataUserForm[e.target.name] = e.target.value;
  });
};

const checkUserInDB = async userData => {
  const userRef = await db
    .firestore()
    .collection('users')
    .doc(userData.id)
    .get();

  if (!userRef.exists) {
    await addUserInFirestore(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  } else {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem(
      'watchedMovies',
      userRef.data().moviesInQueue !== undefined
        ? JSON.stringify(userRef.data().watchedMovies)
        : '[]'
    );
    localStorage.setItem(
      'moviesInQueue',
      userRef.data().moviesInQueue !== undefined
        ? JSON.stringify(userRef.data().moviesInQueue)
        : '[]'
    );
  }
  document.querySelector('.auth-form').reset();
  return location.reload();
};

const signIn = async () => {
  try {
    const response = await signInWithEmailAndPassword(
      auth,
      (email = dataUserForm.email),
      (password = dataUserForm.pass)
    );
    Data = {
      id: response.user.uid,
      name: response.user.displayName,
      photoUser: response.user.photoURL,
      email: response.user.email,
    };
    return checkUserInDB(Data);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
};
const signUp = async () => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      (email = dataUserForm.email),
      (password = dataUserForm.pass)
    );

    await updateProfile(auth.currentUser, {
      displayName: dataUserForm.name,
      // photoURL: avatar,
    });

    userData = {
      id: user.uid,
      name: user.displayName,
      photoUser: user.photoURL,
      email: user.email,
    };

    return checkUserInDB(userData);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    errorMessage === 'Firebase: Error (auth/email-already-in-use).' &&
      errorMessageP('EMAIL EXISTS');

    errorMessage === 'Firebase: Error (auth/invalid-email).' &&
      errorMessageP('INVALID EMAIL');
    console.log(errorMessage);
  }
};

const errorMessageP = message => {
  document.getElementById('error').innerHTML = message;
};

export const authUserForm = () => {
  getValueFormAuth();
  const btnSendForm = document.querySelector('.btnSendForm');

  btnSendForm.addEventListener('click', async e => {
    e.preventDefault();
    const loginForm = e.target.innerText === 'Login';
    if (loginForm) {
      return signIn();
    } else {
      signUp();
    }
  });
};
