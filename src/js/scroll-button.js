const scrollBtn = document.querySelector('.scroll-up__btn');

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 1200 ||
    document.documentElement.scrollTop > 1200
  ) {
    scrollBtn.classList.add('show-btn');
  } else {
    scrollBtn.classList.remove('show-btn');
  }
}

scrollBtn.addEventListener('click', backToTop);

export function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
