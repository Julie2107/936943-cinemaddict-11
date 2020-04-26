import {CARDS_AMOUNT_RENDER, CARDS_AMOUNT_EXTRA, ExtraTitle, Position} from "../components/consts.js";
import FilmsListComponent from "../components/film-block/films-list.js";
import FilmsExtraComponent from "../components/film-block/films-list-extra.js";
import NoFilmsComponent from "../components/film-block/no-films.js";
import MoreButtonComponent from "../components/film-block/more-button.js";
import {render, remove} from "../components/utils.js";
import {renderCard} from "../components/filmcard/render-card.js";

const renderCardsList = (moviesArray, container) => {
  moviesArray.forEach((movie) => {
    renderCard(container, movie);
  });
};

const showMoreHandler = (block, movies, button) => {
  const loadedCards = block.querySelectorAll(`article`);
  const nextLoading = loadedCards.length + CARDS_AMOUNT_RENDER;
  movies.slice(loadedCards.length, nextLoading).forEach((movie) => renderCard(block, movie));

  if (nextLoading >= movies.length) {
    remove(button);
  }
};

const getMoviesArrays = (movies) => {
  return {
    moviesFirst: movies.slice(0, CARDS_AMOUNT_RENDER),
    moviesTop: movies.sort((prevMovie, nextMovie) => nextMovie.rating - prevMovie.rating).slice(0, CARDS_AMOUNT_EXTRA),
    moviesCommented: movies.sort((prevMovie, nextMovie) => nextMovie.comments.length - prevMovie.comments.length).slice(0, CARDS_AMOUNT_EXTRA)
  };
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._filmsListComponent = new FilmsListComponent();
    this._filmsTopComponent = new FilmsExtraComponent(ExtraTitle.TOPRATED);
    this._filmsCommentedComponent = new FilmsExtraComponent(ExtraTitle.COMMENTED);
    this._noFilmsComponent = new NoFilmsComponent();
    this._moreButtonComponent = new MoreButtonComponent();
  }

  render(movies) {
    const container = this._container.getElement();
    const moviesArrays = getMoviesArrays(movies);

    if (movies.length === 0) {
      render(container, this._noFilmsComponent);
    }
    render(container, this._filmsListComponent);

    const filmsListBlock = container.querySelector(`.films-list__container`);

    renderCardsList(moviesArrays.moviesFirst, filmsListBlock);
    render(filmsListBlock, this._moreButtonComponent, Position.AFTEREND);

    render(container, this._filmsTopComponent);
    renderCardsList(moviesArrays.moviesTop, this._filmsTopComponent.getElement().querySelector(`.films-list__container`));

    render(container, this._filmsCommentedComponent);
    renderCardsList(moviesArrays.moviesCommented, this._filmsCommentedComponent.getElement().querySelector(`.films-list__container`));

    this._moreButtonComponent.setShowMoreHandler(() => {
      showMoreHandler(filmsListBlock, movies, this._moreButtonComponent);
    });
  }
}
