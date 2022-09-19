import axios from 'axios';
import { API_KEY } from './key';

export async function getById(movieId) {
  const response = await axios.get(`/${movieId}`, {
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: { api_key: API_KEY },
  });
  console.log(response);
  return response.data;
}
export async function getByVideo() {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/532639/videos?api_key=${API_KEY}&language=en-US`
  );
  console.log(response);
  return response.data;
}
// https://youtu.be/gV_0pYoCssc
