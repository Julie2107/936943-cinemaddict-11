import API from "./api.js";
import LoadingComponent from "./components/film-block/loading.js";
import FooterStatsComponent from "./components/footer-statistics.js";
import PageController from "./controllers/page-controller.js";
import FilterController from "./controllers/filter-controller.js";
import MoviesModel from "./models/movies.js";
import StatsComponent from "./components/statistic/stats.js";
import {render, remove} from "./components/utils.js";

const AUTHORIZATION = `Basic WubbaLubbaDubDUb`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatsBlock = footer.querySelector(`.footer__statistics`);

const init = () => {
  const api = new API(END_POINT, AUTHORIZATION);
  const moviesModel = new MoviesModel();
  const pageController = new PageController(main, moviesModel, api);
  const loadingComponent = new LoadingComponent();
  const statsComponent = new StatsComponent(moviesModel);
  const filterController = new FilterController(main, moviesModel, statsComponent, pageController);


  render(main, loadingComponent);

  api.getMovies()
  .then((movies) => {
    remove(loadingComponent);

    moviesModel.setMovies(movies);

    filterController.render();
    pageController.render();

    render(main, statsComponent);
    statsComponent.render();
    statsComponent.setFilterStatisticsChangeHandler();
    statsComponent.hide();

    render(footerStatsBlock, new FooterStatsComponent(moviesModel.getMovies().length));
  });
};

init();
