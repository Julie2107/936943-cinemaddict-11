import createCardsList from "./components/cardslist.js";
import {CARDS_AMOUNT, Position} from "./components/consts.js";
import createFilmBlock from "./components/film-block.js";
import createFilmsList from "./components/films-list.js";
import createMostCommented from "./components/most-commented.js";
import createNavigation from "./components/navigation.js";
import createSort from "./components/sort.js";
import createTopRated from "./components/top-rated.js";
import createUserProfile from "./components/user-profile.js";
import createMoreButton from "./components/more-button.js";
import createFilmDetails from "./components/film-details.js";
import render from "./components/utils.js";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const init = () => {
  render(header, createUserProfile());
  render(main, createNavigation(), Position.AFTERBEGIN);
  render(main, createSort());
  render(main, createFilmBlock());

  const filmBlock = main.querySelector(`.films`);

  render(filmBlock, createFilmsList(), Position.AFTERBEGIN);

  const filmsList = filmBlock.querySelector(`.films-list`);

  createCardsList(CARDS_AMOUNT, filmsList);
  render(filmsList, createMoreButton());
  render(filmBlock, createTopRated());
  render(filmBlock, createMostCommented());

  render(footer, createFilmDetails(), Position.AFTEREND);
};

init();
