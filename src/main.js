import {CARDS_AMOUNT, CARDS_AMOUNT_RENDER, CARDS_AMOUNT_EXTRA, Position, ExtraTitle} from "./components/consts.js";
import FilmBlockComponent from "./components/film-block/film-block.js";
import MenuComponent from "./components/menu/navigation.js";
import SortComponent from "./components/sorter/sort.js";
import ProfileComponent from "./components/user-profile.js";
import FilmDetailsComponent from "./components/film-details/film-details.js";
import FilmsListComponent from "./components/film-block/films-list.js";
import CardComponent from "./components/filmcard/card.js";
import FilmsListExtraComponent from "./components/film-block/films-list-extra.js";
import FooterStatsComponent from "./components/footer-statistics.js";
import {render} from "./components/utils.js";
import {renderFilmsBlock} from "./components/film-block/render-films-block.js";
import {generateMovies} from "./mocks/movie.js";
import {generateFilters} from "./mocks/filters.js";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatsBlock = footer.querySelector(`.footer__statistics`);

export const movies = generateMovies(CARDS_AMOUNT);

const filters = generateFilters(movies);
const watchedNumber = filters[filters.findIndex((filter) => filter.name === `History`)].count;

/*const moviesForRender = {
  moviesFirst: movies.slice(0, CARDS_AMOUNT_RENDER),
  moviesTop: movies.sort((prevMovie, nextMovie) => nextMovie.rating - prevMovie.rating).slice(0, CARDS_AMOUNT_EXTRA),
  moviesCommented: movies.sort((prevMovie, nextMovie) => nextMovie.comments.length - prevMovie.comments.length).slice(0, CARDS_AMOUNT_EXTRA);
}*/
/*
const moviesFirst = movies.slice(0, CARDS_AMOUNT_RENDER);
const moviesTop = movies.sort((prevMovie, nextMovie) => nextMovie.rating - prevMovie.rating).slice(0, CARDS_AMOUNT_EXTRA);
const moviesCommented = movies.sort((prevMovie, nextMovie) => nextMovie.comments.length - prevMovie.comments.length).slice(0, CARDS_AMOUNT_EXTRA);
*/

const init = () => {
  render(header, new ProfileComponent(watchedNumber).getElement());
  render(main, new MenuComponent(filters).getElement(), Position.AFTERBEGIN);
  render(main, new SortComponent().getElement());
  renderFilmsBlock(movies);
  render(footerStatsBlock, new FooterStatsComponent(movies.length).getElement());
};

init();
