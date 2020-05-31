import API from "./api.js";
import ProfileComponent from "./components/user-profile.js";
import LoadingComponent from "./components/film-block/loading.js";
import FooterStatsComponent from "./components/footer-statistics.js";
import PageController from "./controllers/page-controller.js";
import FilterController from "./controllers/filter-controller.js";
import MoviesModel from "./models/movies.js";
import StatsComponent from "./components/statistic/stats.js";
import {render, remove} from "./components/utils.js";
// import {generateMovies} from "./mocks/movie.js";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatsBlock = footer.querySelector(`.footer__statistics`);

// const movies = generateMovies(CARDS_AMOUNT);

const AUTHORIZATION = `Basic WubbaLubbaDubDUb`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const init = () => {
  const api = new API(END_POINT, AUTHORIZATION);
  const moviesModel = new MoviesModel();
  const pageController = new PageController(main, moviesModel, api);
  const loadingComponent = new LoadingComponent();
  render(main, loadingComponent);
  api.getMovies()
  .then((movies) => {
    remove(loadingComponent);
    moviesModel.setMovies(movies);
    pageController.render();
  });
  // const countIsWatched = moviesModel.getMovies().filter((movie) => movie.isWatched).length;

  const isWatchedMovies = moviesModel.getMoviesAll().filter((movie) => movie.isWatched);
  const statsComponent = new StatsComponent(moviesModel.getMoviesAll());
  const filterController = new FilterController(main, moviesModel, statsComponent, pageController);
  filterController.render();

  render(header, new ProfileComponent(isWatchedMovies.length));
  render(main, statsComponent);
//  statsComponent.setFilterStatisticsChangeHandler();
  statsComponent.hide();

//  statsComponent.render();
  render(footerStatsBlock, new FooterStatsComponent(moviesModel.getMovies().length));
};

init();
