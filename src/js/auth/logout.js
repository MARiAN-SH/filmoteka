import { getAuth, signOut } from 'firebase/auth';

export const logout = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log('logout');
      localStorage.setItem('user', '');
      localStorage.setItem('watchedMovies', '[]');
      localStorage.setItem('moviesInQueue', '[]');
      location.reload();
    })
    .catch(error => {
      console.log(error);
    });
};
