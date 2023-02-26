import db from '../firebase/config';
import firebase from 'firebase/compat/app';
import { getById } from './getById';

const addMoviesToDataUser = async (data, movieId, btn) => {
  const user = JSON.parse(data);
  const userRef = db.firestore().collection('users').doc(user.id);

  let movieObj = {};
  await getById(movieId).then(data => {
    movieObj = data;
  });

  const fieldValue = () => {
    console.log('add');
    if (
      btn.innerText === 'ADD TO QUEUE' ||
      btn.innerText === 'ADD TO WATCHED'
    ) {
      return firebase.firestore.FieldValue.arrayUnion(movieObj);
    } else {
      return firebase.firestore.FieldValue.arrayRemove(movieObj);
    }
  };

  try {
    if (
      btn.innerText === 'ADD TO QUEUE' ||
      btn.innerText === 'ADD TO WATCHED'
    ) {
      await userRef.update(
        btn.id === 'queue'
          ? {
              moviesInQueue: fieldValue(),
            }
          : {
              watchedMovies: fieldValue(),
            }
      );
    } else {
      await userRef.update(
        btn.id === 'queue'
          ? {
              moviesInQueue: fieldValue(),
            }
          : {
              watchedMovies: fieldValue(),
            }
      );
    }
  } catch (e) {
    console.log(e);
    console.log(e.message);
  }
};

export const addMovies = filmData => {
  const watchedBtn = document.querySelector('#watched');
  const queuedButton = document.querySelector('#queue');

  const user = localStorage.getItem('user');

  watchedBtn.addEventListener('click', async e => {
    await addMoviesToDataUser(user, filmData.id, e.target);
  });

  queuedButton.addEventListener('click', async e => {
    await addMoviesToDataUser(user, filmData.id, e.target);
  });
};
