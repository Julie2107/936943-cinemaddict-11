import {createDetailsPoster} from "./details-poster.js";
import {createDetailsHead} from "./details-head.js";
import {createDetailsTable} from "./details-table.js";
import {createDetailsDesc} from "./details-desc.js";
import {createDetailsControls} from "./details-controls.js";
import {createDetailsCommentsList} from "./comments.js";
import {createDetailsNewComment} from "./comment-new.js";
import AbstractSmartComponent from "../abstract-smart-component.js";

const createFilmDetails = (movie) => {
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            ${createDetailsPoster(movie)}
            <div class="film-details__info">
              ${createDetailsHead(movie)}
              ${createDetailsTable(movie)}
              ${createDetailsDesc(movie)}
            </div>
          </div>
          ${createDetailsControls(movie)}
        </div>
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${movie.comments.length}</span></h3>
            <ul class="film-details__comments-list">
                    ${createDetailsCommentsList(movie.comments)}
            </ul>
            ${createDetailsNewComment()}
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(movie) {
    super();
    this._movie = movie;

  /*  this._setCloseButtonClickHandler = null;
    this._setInWatchlistButtonClickHandler = null;
    this._setWatchedButtonClickHandler = null;
    this._setFavoritesButtonClickHandler = null;*/
  }

  getTemplate() {
    return createFilmDetails(this._movie);
  }

  /* recoveryListeners() {
    this._subscribeOnEvents();
    this.setCloseButtonHandler(this._setCloseButtonClickHandler);
    this.setInWatchlistClickHandler(this._setInWatchlistButtonClickHandler);
    this.setWatchedClickHandler(this._setWatchedButtonClickHandler);
    this.setFavoritesClickHandler(this._setFavoritesButtonClickHandler);
  }

  rerender() {
    super.rerender();
  } */

  setCloseButtonHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);

  //  this._setCloseButtonClickHandler = handler;
  }

  setInWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
    .addEventListener(`click`, handler);

    // this._setInWatchlistButtonClickHandler = handler;
  }

  setWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
    .addEventListener(`click`, (handler));

  //  this._setWatchedButtonClickHandler = handler;
  }

  setFavoritesClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);

    //  this._setFavoritesButtonClickHandler = handler;
  }

/*
  _subscribeOnEvents() {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, () => {
        this._isFavorite = !this._isFavorite;

        this.rerender();
      });

    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, () => {
        this._isInWatchlist = !this._isInWatchlist;
        this.rerender();
      });

    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, () => {
        this._isWatched = !this._isWatched;

        this.rerender();
      });
  } */
}
