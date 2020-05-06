const DESC_CAPACITY = 139;
import AbstractSmartComponent from "../abstract-smart-component.js";


const createCard = (movie) => {
  const isChecked = (flag) => flag ? `film-card__controls-item--active` : ``;

  const isTooLong = movie.description.length >= DESC_CAPACITY ? `${movie.description.slice(0, DESC_CAPACITY)}...` : `${movie.description}`;
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${movie.title.name}</h3>
      <p class="film-card__rating">${movie.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${movie.releasedate.year}</span>
        <span class="film-card__duration">${movie.runtime.hours}h ${movie.runtime.minutes}m</span>
        <span class="film-card__genre">${movie.genres[0]}</span>
      </p>
      <img src="./images/posters/${movie.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${isTooLong}</p>
      <a class="film-card__comments">${movie.comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isChecked(movie.isInWatchlist)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isChecked(movie.isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isChecked(movie.isFavorite)}">Mark as favorite</button>
    </form>
    </article>`
  );
};

export default class Card extends AbstractSmartComponent {
  constructor(movie) {
    super();
    this._movie = movie;
  }

  getTemplate() {
    return createCard(this._movie);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  setDetailsHandler(selector, handler) {
    this.getElement().querySelector(selector).addEventListener(`click`, handler);
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
