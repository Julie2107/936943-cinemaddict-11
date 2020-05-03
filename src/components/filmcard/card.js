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

  setDetailsHandler(selector, handler) {
    this.getElement().querySelector(selector).addEventListener(`click`, handler);
  }
}
