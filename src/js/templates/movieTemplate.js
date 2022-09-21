import { getGenreById } from '../getGenres';
import { refs } from '../reference';
const { moviesList } = refs;

const srcImgBase = 'https://image.tmdb.org/t/p/w500';
let markup = '';
export function movieTemplate(data) {
  if (data.results) {
    const moviesResult = data.results;

    // console.log(data.results);
    if (moviesResult.length >= 1) {
      markup = moviesResult.map(
        ({
          id,
          title,
          original_title,
          poster_path,
          genre_ids,
          release_date,
          vote_average,
        }) => {
          // console.log(id);
          const genresList = JSON.parse(localStorage.getItem('genres'));
          const genres = genre_ids.map(item => {
            return getGenreById(item, genresList);
          });
          // check for genres available and formatting their
          let genresMarkup = '';
          if (genres.length === 0) {
            genresMarkup = 'No genres';
          } else if (genres.length < 3) {
            genresMarkup = genres.join(',&nbsp;');
          } else {
            genresMarkup = `${genres[0]}, ${genres[1]}, Others`;
          }
          // check for poster available

          let poster = '';
          poster_path === null
            ? (poster = '/uc4RAVW1T3T29h6OQdr7zu4Blui.jpg')
            : (poster = poster_path);
          // check for the presence of a date

          let relDate = '';
          release_date === '' || release_date === undefined
            ? (relDate = 'No date')
            : (relDate = release_date.slice(0, 4));

          return `<li class="gallery__item">
            <img src="${srcImgBase}${poster}" alt="${original_title}" class="img" id="${id}" />
            <div class="item__ptext">
              <h2 class="item__capt">${title}</h2>
              <div class="item__wrap">
                <p class="item__genre">${genresMarkup} | ${relDate}</p>
              </div>
            </div>
          </li>`;
        }
      );

      return markup.join(' ');
    }
  }

  if (data.genres) {
    let filmGenre = [];

    for (let object of data.genres) {
      filmGenre.push(object.name);
    }
    let poster = '';
    data.poster_path === null
      ? (poster = '/uc4RAVW1T3T29h6OQdr7zu4Blui.jpg')
      : (poster = data.poster_path);
    let relDate = '';
    if (
      data.release_date === '' ||
      data.release_date === null ||
      data.release_date === undefined
    ) {
      relDate = 'No date';
    } else {
      relDate = data.release_date.slice(0, 4);
    }

    let renderGanres = '';
    if (filmGenre.length === 0) {
      renderGanres = 'No genres';
    } else if (filmGenre.length < 3) {
      renderGanres = filmGenre.join(',&nbsp;');
    } else {
      renderGanres = `${filmGenre[0]} ${filmGenre[1]} Others`;
    }

    return `<li class="gallery__item">
            <img src="${srcImgBase}${poster}" alt="${data.original_title}" class="img" id="${data.id}"/>
            <div class="item__ptext">
              <h2 class="item__capt">${data.title}</h2>
              <div class="item__wrap">
                <p class="item__genre">${renderGanres} | ${relDate}</p>
                <p class="item__rating">${data.vote_average}</p>
              </div>
            </div>
          </li>`;
  }
}

export function renderCollection(data) {
  const markup = movieTemplate(data);
  moviesList.insertAdjacentHTML('beforeend', markup);
}
