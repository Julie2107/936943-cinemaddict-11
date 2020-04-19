import {CARDS_AMOUNT, CARDS_AMOUNT_RENDER, CARDS_AMOUNT_EXTRA, Position} from "./components/consts.js";
import createFilmBlock from "./components/film-block/film-block.js";
import createNavigation from "./components/menu/navigation.js";
import createSort from "./components/sorter/sort.js";
import createUserProfile from "./components/user-profile.js";
import createFilmDetails from "./components/film-details/film-details.js";
import {render} from "./components/utils.js";
import {generateMovies} from "./mocks/movie.js";
import {createFooterStatistics} from "./components/footer-statistics.js";
import {generateFilters} from "./mocks/filters.js";
import createCardsList from "./components/filmcard/cardslist.js";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatsBlock = footer.querySelector(`.footer__statistics`);

export const movies = generateMovies(CARDS_AMOUNT);
const filters = generateFilters(movies);
const watchedNumber = filters[filters.findIndex((filter) => filter.name === `History`)].count;

const moviesFirst = movies.slice(0, CARDS_AMOUNT_RENDER);
const moviesTop = movies.sort((prevMovie, nextMovie) => nextMovie.rating - prevMovie.rating).slice(0, CARDS_AMOUNT_EXTRA);
const moviesCommented = movies.sort((prevMovie, nextMovie) => nextMovie.comments.length - prevMovie.comments.length).slice(0, CARDS_AMOUNT_EXTRA);

const init = () => {
  render(header, createUserProfile(watchedNumber));
  render(main, createNavigation(filters), Position.AFTERBEGIN);
  render(main, createSort());
  render(main, createFilmBlock(moviesFirst, moviesTop, moviesCommented));

  render(footerStatsBlock, createFooterStatistics(movies.length));
  render(footer, createFilmDetails(movies[0]), Position.AFTEREND);
};

init();

const loadMoreButton = document.querySelector(`.films-list__show-more`);
const filmsList = main.querySelector(`.films-list`).querySelector(`.films-list__container`);

const loadMoreHandler = () => {
  const loadedCards = filmsList.querySelectorAll(`article`);
  const nextLoading = loadedCards.length + CARDS_AMOUNT_RENDER;
  const nextMoviesLoad = movies.slice(loadedCards.length, nextLoading);
  render(filmsList, createCardsList(nextMoviesLoad));

  if (nextLoading >= movies.length) {
    loadMoreButton.remove();
  }
};

loadMoreButton.addEventListener(`click`, loadMoreHandler);

const details = document.querySelector(`.film-details`);
const closeButton = details.querySelector(`button`);
closeButton.addEventListener(`click`, function () {
  details.remove();
});
