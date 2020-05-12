import {CARDS_AMOUNT_RENDER, CARDS_AMOUNT_EXTRA, ExtraTitle, Position} from "../components/consts.js";
import FilmBlockComponent from "../components/film-block/film-block.js";
import FilmsListComponent from "../components/film-block/films-list.js";
import SortComponent from "../components/sorter/sort.js";
import FilmsExtraComponent from "../components/film-block/films-list-extra.js";
import NoFilmsComponent from "../components/film-block/no-films.js";
import MoreButtonComponent from "../components/film-block/more-button.js";
import MovieController from "./movie-controller.js";
import {render, remove} from "../components/utils.js";

const renderCardsList = (moviesArray, container, onDataChange, onViewChange) => {
  return moviesArray.map((movie) => {
    const movieController = new MovieController(container, onDataChange, onViewChange);

    movieController.render(movie);

    return movieController;
  });
};

const moviesForRender = {
  moviesFirst: (movies) => movies.slice(0, CARDS_AMOUNT_RENDER),

  moviesTop: (movies) => [...movies].sort((prevMovie, nextMovie) => nextMovie.rating - prevMovie.rating).slice(0, CARDS_AMOUNT_EXTRA),

  moviesCommented: (movies) => [...movies].sort((prevMovie, nextMovie) => nextMovie.comments.length - prevMovie.comments.length).slice(0, CARDS_AMOUNT_EXTRA)
};

const sortMovies = {
  'rating': (movies) => [...movies].sort((prevMovie, nextMovie) => nextMovie.rating - prevMovie.rating),
  'date': (movies) => [...movies].sort((currentMovie, nextMovie) => nextMovie.releasedate.year - currentMovie.releasedate.year),
  'default': (movies) => movies
};

export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._showedMovieControllers = [];
    this._sorterComponent = new SortComponent();
    this._filmsBlockComponent = new FilmBlockComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._filmsTopComponent = new FilmsExtraComponent(ExtraTitle.TOPRATED);
    this._filmsCommentedComponent = new FilmsExtraComponent(ExtraTitle.COMMENTED);
    this._noFilmsComponent = new NoFilmsComponent();
    this._moreButtonComponent = new MoreButtonComponent();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._getSortHandler = this._getSortHandler.bind(this);

    this._sorterComponent.setSortTypeChangeHandler(this._getSortHandler);
  }

  render() {
    const container = this._container;
    const movies = this._moviesModel.getMovies();
    render(container, this._filmsBlockComponent);

    const moviesContainer = this._filmsBlockComponent.getElement();
    if (movies.length === 0) {
      render(moviesContainer, this._noFilmsComponent);
    }
    render(moviesContainer, this._filmsListComponent);
    render(moviesContainer, this._sorterComponent, Position.BEFOREBEGIN);

    const filmsListBlock = moviesContainer.querySelector(`.films-list__container`);
    /*const newCards = renderCardsList(moviesForRender.moviesFirst(movies), filmsListBlock, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newCards);*/
    this._renderMovies(movies);
    this._renderShowMoreBtn(filmsListBlock, movies);
    this._renderTopFilms(moviesContainer, moviesForRender.moviesTop(movies));

    this._renderCommentedFilms(moviesContainer, moviesForRender.moviesCommented(movies));
  }

  _renderShowMoreBtn(block, movies) {
    const loadedCards = block.querySelectorAll(`article`);
    if (loadedCards.length >= this._moviesModel.getMovies().length) {
      return;
    }
    if (this._moreButtonComponent.getElement()) {
      remove(this._moreButtonComponent);
    }
    render(block, this._moreButtonComponent, Position.AFTEREND);
    this._moreButtonComponent.setShowMoreHandler(() => {
      this._showMoreHandler(block, movies, this._moreButtonComponent);
    });
  }

  _renderMovies(movies) {
    const moviesContainer = this._filmsBlockComponent.getElement();

    const filmsListBlock = moviesContainer.querySelector(`.films-list__container`);
    const newCards = renderCardsList(moviesForRender.moviesFirst(movies), filmsListBlock, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newCards);
  }

  _renderTopFilms(container, movies) {
    render(container, this._filmsTopComponent);
    const topCards = renderCardsList(movies, this._filmsTopComponent.getElement().querySelector(`.films-list__container`));

  }

  _renderCommentedFilms(container, movies) {
    render(container, this._filmsCommentedComponent);
    const commentedCards = renderCardsList(movies, this._filmsCommentedComponent.getElement().querySelector(`.films-list__container`));
  }

  _getSortHandler(sortType) {
    const sortedMovies = sortMovies[sortType](this._moviesModel.getMovies());
    const filmsListBlock = this._filmsBlockComponent.getElement().querySelector(`.films-list__container`);

    filmsListBlock.innerHTML = ``;
    const sortedCards = renderCardsList(moviesForRender.moviesFirst(sortedMovies), filmsListBlock, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(sortedCards);

    this._renderShowMoreBtn(filmsListBlock, sortedMovies);
  }

  _showMoreHandler(block, movies, button) {
    const loadedCards = block.querySelectorAll(`article`);
    const nextLoading = loadedCards.length + CARDS_AMOUNT_RENDER;
    const newCards = renderCardsList(movies.slice(loadedCards.length, nextLoading), block, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newCards);
    if (nextLoading >= this._moviesModel.getMovies().length) {
      remove(button);
    }
  }

  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData);
    }
    /*const index = this._moviesModel.getMovies().findIndex((item) => item === oldData);

    if (index === -1) {
      return;
    }

    this._movies = [].concat(this._moviesModel.getMovies().slice(0, index), newData, this._movies.slice(index + 1));
    movieController.render(this._moviesModel.getMovies()[index]);*/
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((item) => item.setDefaultView());
  }
}
