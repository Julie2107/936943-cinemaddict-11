import {CARDS_AMOUNT, Position} from "./components/consts.js";
import MenuComponent from "./components/menu/navigation.js";
import ProfileComponent from "./components/user-profile.js";
import FooterStatsComponent from "./components/footer-statistics.js";
import PageController from "./controllers/page-controller.js";
import FilterController from "./controllers/filter-controller.js";
import MoviesModel from "./models/movies.js";
import {render} from "./components/utils.js";
import {generateMovies} from "./mocks/movie.js";
//import {generateFilters} from "./mocks/filters.js";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatsBlock = footer.querySelector(`.footer__statistics`);

const movies = generateMovies(CARDS_AMOUNT);
const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);
//const filters = generateFilters(movies);
//const watchedNumber = filters[filters.findIndex((filter) => filter.name === `History`)].count;

const init = () => {
  const filterController = new FilterController(main, moviesModel);
  filterController.render();
  const countIsWatched = movies.filter((movie) => movie.isWatched).length;
  render(header, new ProfileComponent(countIsWatched));
//  render(main, new MenuComponent(filters), Position.AFTERBEGIN);
  const pageController = new PageController(main, moviesModel);
  pageController.render();
  render(footerStatsBlock, new FooterStatsComponent(moviesModel.getMovies().length));
};

init();
