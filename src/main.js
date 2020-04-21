import {CARDS_AMOUNT, Position} from "./components/consts.js";
import MenuComponent from "./components/menu/navigation.js";
import SortComponent from "./components/sorter/sort.js";
import ProfileComponent from "./components/user-profile.js";
import FooterStatsComponent from "./components/footer-statistics.js";
import {render} from "./components/utils.js";
import {renderFilmsBlock} from "./components/film-block/render-films-block.js";
import {generateMovies} from "./mocks/movie.js";
import {generateFilters} from "./mocks/filters.js";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatsBlock = footer.querySelector(`.footer__statistics`);

const movies = generateMovies(CARDS_AMOUNT);
const filters = generateFilters(movies);
const watchedNumber = filters[filters.findIndex((filter) => filter.name === `History`)].count;

const init = () => {
  render(header, new ProfileComponent(watchedNumber).getElement());
  render(main, new MenuComponent(filters).getElement(), Position.AFTERBEGIN);
  render(main, new SortComponent().getElement());
  renderFilmsBlock(movies);
  render(footerStatsBlock, new FooterStatsComponent(movies.length).getElement());
};

init();
