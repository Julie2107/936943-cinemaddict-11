import {CARDS_AMOUNT_RENDER, CARDS_AMOUNT_EXTRA, ExtraTitle, Position} from "../components/consts.js";
import FilmBlockComponent from "../components/film-block/film-block.js";
import FilmsListComponent from "../components/film-block/films-list.js";
import SortComponent from "../components/sorter/sort.js";
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
    moviesTop: [...movies].sort((prevMovie, nextMovie) => nextMovie.rating - prevMovie.rating).slice(0, CARDS_AMOUNT_EXTRA),
    moviesCommented: [...movies].sort((prevMovie, nextMovie) => nextMovie.comments.length - prevMovie.comments.length).slice(0, CARDS_AMOUNT_EXTRA)
  };
};

const getSortedMovies = (movies) => {
  return {
    'rating': [...movies].sort((prevMovie, nextMovie) => nextMovie.rating - prevMovie.rating),
    'date': [...movies].sort((currentMovie, nextMovie) => nextMovie.releasedate.year - currentMovie.releasedate.year),
    'default': movies
  };
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._sorterComponent = new SortComponent();
    this._filmsBlockComponent = new FilmBlockComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._filmsTopComponent = new FilmsExtraComponent(ExtraTitle.TOPRATED);
    this._filmsCommentedComponent = new FilmsExtraComponent(ExtraTitle.COMMENTED);
    this._noFilmsComponent = new NoFilmsComponent();
    this._moreButtonComponent = new MoreButtonComponent();
  }

  renderShowMoreBtn(block, movies) {
    if (this._moreButtonComponent.getElement()) {
      remove(this._moreButtonComponent);
    }
    render(block, this._moreButtonComponent, Position.AFTEREND);
    this._moreButtonComponent.setShowMoreHandler(() => {
      showMoreHandler(block, movies, this._moreButtonComponent);
    });
  }

  renderTopFilms(container, movies) {
    render(container, this._filmsTopComponent);
    renderCardsList(movies, this._filmsTopComponent.getElement().querySelector(`.films-list__container`));
  }

  renderCommentedFilms(container, movies) {
    render(container, this._filmsCommentedComponent);
    renderCardsList(movies, this._filmsCommentedComponent.getElement().querySelector(`.films-list__container`));
  }

  render(movies) {
    const container = this._container;
    const moviesArrays = getMoviesArrays(movies);
    render(container, this._filmsBlockComponent);
    const moviesContainer = this._filmsBlockComponent.getElement();
    if (movies.length === 0) {
      render(moviesContainer, this._noFilmsComponent);
    }
    render(moviesContainer, this._filmsListComponent);
    render(moviesContainer, this._sorterComponent, Position.BEFOREBEGIN);
    const filmsListBlock = moviesContainer.querySelector(`.films-list__container`);
    renderCardsList(moviesArrays.moviesFirst, filmsListBlock);
    this.renderShowMoreBtn(filmsListBlock, movies);

    this.renderTopFilms(moviesContainer, moviesArrays.moviesTop);

    this.renderCommentedFilms(moviesContainer, moviesArrays.moviesCommented);

    this._sorterComponent.setSortTypeChangeHandler((sortType) => {
      const sortedMovies = getSortedMovies(movies)[sortType];

      filmsListBlock.innerHTML = ``;

      renderCardsList(getMoviesArrays(sortedMovies).moviesFirst, filmsListBlock);

      this.renderShowMoreBtn(filmsListBlock, sortedMovies);
    });
  }
}
