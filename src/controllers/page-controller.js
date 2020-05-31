import FilmBlockComponent from "../components/film-block/film-block.js";
import FilmsListComponent from "../components/film-block/films-list.js";
import SortComponent from "../components/sorter/sort.js";
import NoFilmsComponent from "../components/film-block/no-films.js";
import MoreButtonComponent from "../components/film-block/more-button.js";
import MovieController from "./movie-controller.js";
import ProfileComponent from "../components/user-profile.js";
import {CARDS_AMOUNT_RENDER, CARDS_AMOUNT_EXTRA, Position, SortType} from "../components/consts.js";
import {render, remove, generateDate} from "../components/utils.js";

const header = document.querySelector(`.header`);

const renderCardsList = (moviesArray, container, dataChangeHandler, viewChangeHandler, api) => {

  return moviesArray.map((movie) => {
    const movieController = new MovieController(container, dataChangeHandler, viewChangeHandler, api);
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
  'date': (movies) => [...movies].sort((currentMovie, nextMovie) => generateDate(nextMovie.releasedate).year - generateDate(currentMovie.releasedate).year),
  'default': (movies) => movies
};

export default class PageController {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;

    this._showedMovieControllers = [];
    this._profileComponent = new ProfileComponent(moviesModel);
    this._sorterComponent = new SortComponent();
    this._filmsBlockComponent = new FilmBlockComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._moreButtonComponent = new MoreButtonComponent();
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._getSortHandler = this._getSortHandler.bind(this);
    this._showMoreHandler = this._showMoreHandler.bind(this);

    this._sorterComponent.setSortTypeChangeHandler(this._getSortHandler);
    this._moviesModel.setFilterChangeHandler(this._filterChangeHandler);
  }

  render() {
    const container = this._container;
    const movies = this._moviesModel.getMovies();

    render(header, this._profileComponent);
    render(container, this._filmsBlockComponent);

    const moviesContainer = this._filmsBlockComponent.getElement();
    if (movies.length === 0) {
      render(moviesContainer, this._noFilmsComponent);
    }
    render(moviesContainer, this._filmsListComponent);
    render(moviesContainer, this._sorterComponent, Position.BEFOREBEGIN);
    this._renderMovies(movies);
    this._renderShowMoreBtn(movies);
  }

  show() {
    this._filmsBlockComponent.show();
    this._sorterComponent.show();
  }

  hide() {
    this._filmsBlockComponent.hide();
    this._sorterComponent.hide();
  }

  _renderShowMoreBtn(movies) {
    const filmsListBlock = this._filmsBlockComponent.getElement().querySelector(`.films-list__container`);
    const loadedCards = filmsListBlock.querySelectorAll(`article`);

    if (this._moreButtonComponent.getElement()) {
      remove(this._moreButtonComponent);
    }
    if (loadedCards.length >= movies.length) {
      return;
    }
    render(filmsListBlock, this._moreButtonComponent, Position.AFTEREND);
    this._moreButtonComponent.setShowMoreHandler(() => {
      this._showMoreHandler(filmsListBlock, movies, this._moreButtonComponent);
    });
  }
  // очищение борда
  _removeMovies() {
    this._showedMovieControllers.forEach((movieController) => movieController.destroy());
    this._showedMovieControllers = [];
  }

  _renderMovies(movies) {
    const filmsListBlock = this._filmsBlockComponent.getElement().querySelector(`.films-list__container`);

    const newCards = renderCardsList(moviesForRender.moviesFirst(movies), filmsListBlock, this._dataChangeHandler, this._viewChangeHandler, this._api);
    this._showedMovieControllers = this._showedMovieControllers.concat(newCards);
  }

  _updateMovies(movies) {
    this._removeMovies();
    this._renderMovies(movies);
  }

  _getSortHandler(sortType) {
    const sortedMovies = sortMovies[sortType](this._moviesModel.getMovies());

    this._updateMovies(sortedMovies);
    this._renderShowMoreBtn(sortedMovies);
  }

  _showMoreHandler(block, movies, button) {
    const loadedCards = block.querySelectorAll(`article`);
    const nextLoading = loadedCards.length + CARDS_AMOUNT_RENDER;
    const newCards = renderCardsList(movies.slice(loadedCards.length, nextLoading), block, this._dataChangeHandler, this._viewChangeHandler, this._api);
    this._showedMovieControllers = this._showedMovieControllers.concat(newCards);
    if (nextLoading >= this._moviesModel.getMovies().length) {
      remove(button);
    }
  }

  _dataChangeHandler(movieController, oldData, newData) {
    this._api.updateMovie(oldData.id, newData)
      .then((movieModel) => {
        const isSuccess = this._moviesModel.updateMovie(oldData.id, movieModel);
        if (isSuccess) {
          movieController.render(movieModel);
          this._profileComponent.rerender();
        }
      });
  }

  _viewChangeHandler() {
    this._showedMovieControllers.forEach((item) => item.setDefaultView());
  }

  _filterChangeHandler() {
    this._moviesModel.setSorter(SortType.DEFAULT);
    this._sorterComponent.resetSort();
    this._updateMovies(this._moviesModel.getMovies());
    this._renderShowMoreBtn(this._moviesModel.getMovies());
  }
}
