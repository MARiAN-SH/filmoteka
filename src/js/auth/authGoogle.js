import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import db from '../../firebase/config';
import { setMoviesInLS } from '../getUserMovis';

export const authGoogle = () => {
  const btnGoogleAuth = document.querySelector('.btnGoogleAuth');

  btnGoogleAuth.addEventListener('click', async e => {
    e.preventDefault();
    const auth = getAuth(db);
    const provider = new GoogleAuthProvider(db);

    const addUserInFirestore = async user => {
      await db.firestore().collection('users').doc(user.id).set(user);
    };
    console.log(btnGoogleAuth);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = {
        id: result.user.uid,
        name: result.user.displayName,
        photoUser: result.user.photoURL,
        email: result.user.email,
      };

      const userRef = await db
        .firestore()
        .collection('users')
        .doc(user.id)
        .get();

      if (!userRef.exists) {
        await addUserInFirestore(user);
        localStorage.setItem('user', JSON.stringify(user));
        return location.reload();
      } else {
        localStorage.setItem('user', JSON.stringify(user));
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
        return location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  });
};
