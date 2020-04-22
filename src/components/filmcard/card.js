const DESC_CAPACITY = 139;
import {createElement} from "../utils.js";


const createCard = (movie) => {
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
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Card {
  constructor(movie) {
    this._movie = movie;

    this.element = null;
  }

  getTemplate() {
    return createCard(this._movie);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
