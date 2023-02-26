import { getTrending } from './getTrending';
import { loadingOn, loadingOff } from './loading';
import { checkLocalStorageGenres } from './localStorageApi';
import { renderCollection } from './templates/movieTemplate';
import { addEfectRenderer } from '../js/effect_for_cart';
import { refs } from './reference';
import { backToTop } from './scroll-button';
const { moviesList } = refs;
//end temp temporary constants
let totalPages = 1;
let markup = '';
let currentPage = 1;

export default async function renderMoviesList(pageNumber) {
  currentPage = pageNumber;

  checkLocalStorageGenres();

  await getTrending(currentPage).then(res => {
    totalPages = res.total_pages;
    moviesList.innerHTML = '';
    setTimeout(() => {
      markup = renderCollection(res);
      addEfectRenderer();
    }, 500);
  });
}

// pagination=====================
async function addPagination() {
  currentPage === 1 && (await renderMoviesList(currentPage));
  $(`#pagination-container`).addHook('beforePaging', function () {
    loadingOn();
  });

  $(`#pagination-container`).pagination({
    dataSource: function (done) {
      var result = [];
      for (var i = 1; i <= totalPages; i++) {
        result.push(i);
      }
      done(result);
    },
    pageSize: 1,
    callback: async function (data, pagination) {
      if (pagination.pageNumber === 1) return loadingOff();
      await renderMoviesList(pagination.pageNumber);
      backToTop();
      // template method of yourself
      var html = markup;

      $(`.film__list`).html(html);
      loadingOff();
    },
  });
}

addPagination();
