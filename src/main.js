import {CARDS_AMOUNT, Position} from "./components/consts.js";
import MenuComponent from "./components/menu/navigation.js";
import SortComponent from "./components/sorter/sort.js";
import ProfileComponent from "./components/user-profile.js";
import FooterStatsComponent from "./components/footer-statistics.js";
import FilmBlockComponent from "./components/film-block/film-block.js";
import PageController from "./controllers/page-controller.js";
import {render} from "./components/utils.js";
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
  render(header, new ProfileComponent(watchedNumber));
  render(main, new MenuComponent(filters), Position.AFTERBEGIN);
  render(main, new SortComponent());
  const filmsBlock = new FilmBlockComponent();
  render(main, filmsBlock);
  const pageController = new PageController(filmsBlock);
  pageController.render(movies);
  render(footerStatsBlock, new FooterStatsComponent(movies.length));
};

init();
