import {CARDS_AMOUNT, Position} from "./components/consts.js";
import MenuComponent from "./components/menu/navigation.js";
import ProfileComponent from "./components/user-profile.js";
import FooterStatsComponent from "./components/footer-statistics.js";
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
  const pageController = new PageController(main);
  pageController.render(movies);
  render(footerStatsBlock, new FooterStatsComponent(movies.length));
};

init();
