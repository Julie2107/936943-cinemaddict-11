import CardComponent from "../components/filmcard/card.js";
import FilmDetailsComponent from "../components/film-details/film-details.js";
import CardControlsComponent from "../components/filmcard/card-controls.js";

import {render, remove, replace} from "../components/utils.js";
import {Position} from "../components/consts.js";

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};
const footer = document.querySelector(`.footer`);

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._mode = Mode.DEFAULT;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._cardComponent = null;
    this._cardControlsComponent = null;
    this._filmDetailsBlock = null;
    this._escKeyHandler = this._escKeyHandler.bind(this);
    this._setDataChangePopupHandler = this._setDataChangePopupHandler.bind(this);
    this._setDataChangeCardHandler = this._setDataChangeCardHandler.bind(this);

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

    //this.renderCardControls(movie);
    this._cardComponent.setDetailsHandler(`.film-card__poster`, () => {
      this._openFilmDetailsHandler(movie);
    });

    this._cardComponent.setDetailsHandler(`.film-card__title`, () => {
      this._openFilmDetailsHandler(movie);
    });

    this._cardComponent.setDetailsHandler(`.film-card__comments`, () => {
      this._openFilmDetailsHandler(movie);
    });
    this._setDataChangeCardHandler(movie);
  }

  /*renderCardControls(movie) {
    const oldControls = this._cardControlsComponent;
    this._cardControlsComponent = new CardControlsComponent(movie);
    const oldDetailsBlock = this._filmDetailsBlock;
    this._filmDetailsBlock = new FilmDetailsComponent(movie);

    if (oldControls) {
      replace(this._cardControlsComponent, oldControls);
      replace(this._filmDetailsBlock, oldDetailsBlock);

    }
    render(this._cardComponent.getElement(), this._cardControlsComponent);
    this._setDataChangeCardHandler(movie);

  }*/

  _setDataChangeCardHandler(movie) {
    this._cardComponent.setFavoritesClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isFavorite: !movie.isFavorite,
      }));
    });

    this._cardComponent.setInWatchlistClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isInWatchlist: !movie.isInWatchlist,
      }));
    });

    this._cardComponent.setWatchedClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatched: !movie.isWatched,
      }));
    });
  }

  _setDataChangePopupHandler(movie) {
    this._filmDetailsBlock.setFavoritesClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isFavorite: !movie.isFavorite,
      }));
    });

    this._filmDetailsBlock.setInWatchlistClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isInWatchlist: !movie.isInWatchlist,
      }));
    });

    this._filmDetailsBlock.setWatchedClickHandler(() => {
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
    const oldDetailsBlock = this._filmDetailsBlock;
    this._filmDetailsBlock = new FilmDetailsComponent(movie);

    if (oldDetailsBlock) {
      replace(this._filmDetailsBlock, oldDetailsBlock);
    }
    render(footer, this._filmDetailsBlock, Position.AFTEREND);
    this._filmDetailsBlock._subscribeOnEvents();
    this._mode = Mode.DETAILS;
    this._filmDetailsBlock.setCloseButtonHandler(() => {
      remove(this._filmDetailsBlock);
      this._mode = Mode.DEFAULT;

      document.removeEventListener(`keydown`, this._escKeyHandler);
    });
   this._setDataChangePopupHandler(movie);
  }
  _escKeyHandler(evt) {
    if (evt.key === `Escape`) {
      remove(this._filmDetailsBlock);
      this._mode = Mode.DEFAULT;
      document.removeEventListener(`keydown`, this._escKeyHandler);
    }
  }
}
