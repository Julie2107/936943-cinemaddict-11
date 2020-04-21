import {CARDS_AMOUNT_RENDER, CARDS_AMOUNT_EXTRA, ExtraTitle} from "../consts.js";
import FilmBlockComponent from "./film-block.js";
import FilmsListComponent from "./films-list.js";
import FilmsExtraComponent from "./films-list-extra.js";
import {renderCard} from "../filmcard/render-card.js";
import {render} from "../utils.js";
const main = document.querySelector(`.main`);

const renderCardsList = (moviesArray, container) => {
  moviesArray.forEach((movie) => {
    renderCard(container, movie);
  });
};

const loadMoreHandler = (block, movies, button) => {
  const loadedCards = block.querySelectorAll(`article`);
  const nextLoading = loadedCards.length + CARDS_AMOUNT_RENDER;
  movies.slice(loadedCards.length, nextLoading).forEach((movie) => renderCard(block, movie));

  if (nextLoading >= movies.length) {
    button.remove();
  }
};

const getMoviesArrays = (movies) => {
  return {
    moviesFirst: movies.slice(0, CARDS_AMOUNT_RENDER),
    moviesTop: movies.sort((prevMovie, nextMovie) => nextMovie.rating - prevMovie.rating).slice(0, CARDS_AMOUNT_EXTRA),
    moviesCommented: movies.sort((prevMovie, nextMovie) => nextMovie.comments.length - prevMovie.comments.length).slice(0, CARDS_AMOUNT_EXTRA)
  };
};

export const renderFilmsBlock = (movies) => {
  const filmsBlock = new FilmBlockComponent();
  render(main, filmsBlock.getElement());
  render(filmsBlock.getElement(), new FilmsListComponent().getElement());

  const filmsListBlock = filmsBlock.getElement().querySelector(`.films-list__container`);

  renderCardsList(getMoviesArrays(movies).moviesFirst, filmsListBlock);

  const topratedBlock = new FilmsExtraComponent(ExtraTitle.TOPRATED).getElement();

  render(filmsBlock.getElement(), topratedBlock);
  renderCardsList(getMoviesArrays(movies).moviesTop, topratedBlock.querySelector(`.films-list__container`));

  const commentedBlock = new FilmsExtraComponent(ExtraTitle.COMMENTED).getElement();

  render(filmsBlock.getElement(), commentedBlock);
  renderCardsList(getMoviesArrays(movies).moviesCommented, commentedBlock.querySelector(`.films-list__container`));

  const loadMoreButton = filmsBlock.getElement().querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, () => {
    loadMoreHandler(filmsListBlock, movies, loadMoreButton);
  });
};
