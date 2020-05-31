import AbstractSmartComponent from "../abstract-smart-component.js";

const createCardControls = (movie) => {
  const isChecked = (flag) => flag ? `film-card__controls-item--active` : ``;
  return (
    `<form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isChecked(movie.isInWatchlist)}">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isChecked(movie.isWatched)}">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${isChecked(movie.isFavorite)}">Mark as favorite</button>
  </form>`
  );
};

export default class CardControls extends AbstractSmartComponent {
  constructor(movie) {
    super();
    this._movie = movie;
    this._subscribeOnEvents = this._subscribeOnEvents.bind(this);
  }

  setFavoritesClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }

  setInWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  getTemplate() {
    return createCardControls(this._movie);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  _subscribeOnEvents() {

    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, () => {
        this._isFavorite = !this._isFavorite;
        this.rerender();
      });

    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, () => {
        this._isInWatchlist = !this._isInWatchlist;
        this.rerender();
      });

    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, () => {
        this._isWatched = !this._isWatched;

        this.rerender();
      });
  }
}
