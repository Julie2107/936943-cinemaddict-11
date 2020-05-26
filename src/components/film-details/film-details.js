import {createDetailsPoster} from "./details-poster.js";
import {createDetailsHead} from "./details-head.js";
import {createDetailsTable} from "./details-table.js";
import {createDetailsDesc} from "./details-desc.js";
import {createDetailsControls} from "./details-controls.js";
import {createDetailsNewComment} from "./comment-new.js";
import AbstractSmartComponent from "../abstract-smart-component.js";
import CommentComponent from "./comments.js";

const createFilmDetails = (movie, commentsMarkup) => {
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
                    ${commentsMarkup}
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
    this._setEmojiClickButtonHandler = null;

    this._setCloseButtonClickHandler = null;
    this._setInWatchlistButtonClickHandler = null;
    this._setWatchedButtonClickHandler = null;
    this._setFavoritesButtonClickHandler = null;
    this._setEmojiClickButtonHandler = null;
    this._setDeleteCommentBtnClickHanler = null;
    this._addNewCommentHandler = null;
  }

  getTemplate() {
    console.log(this._movie.comments);
    return createFilmDetails(this._movie, this._getCommentsTemplate(this._movie.comments));
  }

  recoveryListeners() {
  //  this._subscribeOnEvents();
    this.setEmojiClickHandler(this._setEmojiClickButtonHandler);
    this.setCloseButtonHandler(this._setCloseButtonClickHandler);
    this.setInWatchlistClickHandler(this._setInWatchlistButtonClickHandler);
    this.setWatchedClickHandler(this._setWatchedButtonClickHandler);
    this.setFavoritesClickHandler(this._setFavoritesButtonClickHandler);
    this.setDeleteCommentBtnHandler(this._setDeleteCommentBtnClickHanler);
    this.setNewCommentHandler(this._addNewCommentHandler);
  }

  rerender() {
    super.rerender();
  }

  setCloseButtonHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);

    this._setCloseButtonClickHandler = handler;
  }

  setInWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
    .addEventListener(`click`, handler);

    this._setInWatchlistButtonClickHandler = handler;
  }

  setWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
    .addEventListener(`click`, (handler));

    this._setWatchedButtonClickHandler = handler;
  }

  setFavoritesClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);

    this._setFavoritesButtonClickHandler = handler;
  }

  setDeleteCommentBtnHandler(handler) {
    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);

    Array.from(deleteButtons).forEach((button) => {
      button.addEventListener(`click`, handler);
    });
    this._setDeleteCommentBtnClickHanler = handler;
  }

  setEmojiClickHandler(handler) {
    this.getElement().querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, handler);

    this._setEmojiClickButtonHandler = handler;
  }

  getEmojiElement(emoji) {
    const emojiImage = document.createElement(`img`);
    emojiImage.setAttribute(`src`, `./images/emoji/${emoji}.png`);
    emojiImage.setAttribute(`width`, `100%`);
    return emojiImage;
  }

  setNewCommentHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, handler);

    this._addNewCommentHandler = handler;
  }

  _getCommentsTemplate(comments) {
    return comments.map((comment) =>
      new CommentComponent(comment).getTemplate())
    .join(`\n`);
  }
}
