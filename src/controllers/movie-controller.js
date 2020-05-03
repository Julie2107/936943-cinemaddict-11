import CardComponent from "../components/filmcard/card.js";
import FilmDetailsComponent from "../components/film-details/film-details.js";

import {render, remove, replace} from "../components/utils.js";
import {Position} from "../components/consts.js";

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._mode = Mode.DEFAULT;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._cardComponent = null;
    this._filmDetailsBlock = null;
    this._escKeyHandler = this._escKeyHandler.bind(this);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      remove(this._filmDetailsBlock);
    }
  }

  render(movie) {
    const oldCardComponent = this._cardComponent;
    this._cardComponent = new CardComponent(movie);
    const oldDetailsBlock = this._filmDetailsBlock;
    this._filmDetailsBlock = new FilmDetailsComponent(movie);

    if (oldCardComponent && oldDetailsBlock) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._filmDetailsBlock, oldDetailsBlock);
    } else {
      render(this._container, this._cardComponent);
    }
    this._cardComponent.setDetailsHandler(`.film-card__poster`, () => {
      this._openFilmDetailsHandler(movie);

    });

    this._cardComponent.setDetailsHandler(`.film-card__title`, () => {
      this._openFilmDetailsHandler(movie);
    });

    this._cardComponent.setDetailsHandler(`.film-card__comments`, () => {
      this._openFilmDetailsHandler(movie);
    });

    this._setDataChangeHandler(this._cardComponent, movie);
  }

  _setDataChangeHandler(component, movie) {
    component.setFavoritesClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isFavorite: !movie.isFavorite,
      }));
    });

    component.setInWatchlistClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isInWatchlist: !movie.isInWatchlist,
      }));
    });

    component.setWatchedClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatched: !movie.isWatched,
      }));
    });
  }

  _openFilmDetailsHandler(movie) {
    this._onViewChange();
    this._renderMovie(movie);
  }

  _renderMovie(movie) {
    const footer = document.querySelector(`.footer`);
    render(footer, this._filmDetailsBlock, Position.AFTEREND);
    this._mode = Mode.DETAILS;
    this._filmDetailsBlock.setCloseButtonHandler(() => {
      remove(this._filmDetailsBlock);
      this._mode = Mode.DEFAULT;

      document.removeEventListener(`keydown`, this._escKeyHandler);
    });

    this._setDataChangeHandler(this._filmDetailsBlock, movie);

    document.addEventListener(`keydown`, (evt) => {
      this._escKeyHandler(evt);
    });
  }

  _escKeyHandler(evt) {
    if (evt.key === `Escape`) {
      remove(this._filmDetailsBlock);
      this._mode = Mode.DEFAULT;
      document.removeEventListener(`keydown`, this._escKeyHandler);
    }
  }
}
