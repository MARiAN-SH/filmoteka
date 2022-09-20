import axios from 'axios';
import { API_KEY } from './key';

export async function getById(movieId) {
  const response = await axios.get(`/${movieId}`, {
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: { api_key: API_KEY },
  });
  // console.log(response);
  return response.data;
}
export async function getByVideo(id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${
      id || 361743
    }/videos?api_key=${API_KEY}&language=en-US`
  );
  const keyTreler = response.data.results[0].key;
  return keyTreler || null;
}
