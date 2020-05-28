import CardComponent from "../components/filmcard/card.js";
import FilmDetailsComponent from "../components/film-details/film-details.js";
import CommentComponent from "../components/film-details/comments.js";
import MovieModel from "../models/movie.js";
import {encode} from "he";
// import CardControlsComponent from "../components/filmcard/card-controls.js";
import {render, remove, replace} from "../components/utils.js";
import {Position} from "../components/consts.js";

const SHAKE_TIMEOUT = 600;

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};
const footer = document.querySelector(`.footer`);

export const EmptyComment = {};

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._api = api;
    this._mode = Mode.DEFAULT;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._cardComponent = null;
    //  this._cardControlsComponent = null;
    this._filmDetailsBlock = null;
    this._escKeyHandler = this._escKeyHandler.bind(this);
    this._openFilmDetailsHandler = this._openFilmDetailsHandler.bind(this);
    this._closeDetailsHandler = this._closeDetailsHandler.bind(this);
    this._setEmojiHandler = this._setEmojiHandler.bind(this);
    this._deleteCommentHandler = this._deleteCommentHandler.bind(this);
    this._addCommentHandler = this._addCommentHandler.bind(this);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeDetailsHandler();
    }
  }

  render(movie) {
    const oldCardComponent = this._cardComponent;
    this._cardComponent = new CardComponent(movie);

    const oldDetailsBlock = this._filmDetailsBlock;
    this._filmDetailsBlock = new FilmDetailsComponent(movie);

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
    this._setDataChangePopupHandler(movie);
    this._filmDetailsBlock.setCloseButtonHandler(this._closeDetailsHandler);
    this._filmDetailsBlock.setEmojiClickHandler((evt) => {
      this._setEmojiHandler(evt);
    });
    this._filmDetailsBlock.setNewCommentHandler((evt) => {
      this._addCommentHandler(evt, movie);
    });

    this._filmDetailsBlock.setDeleteCommentBtnHandler((evt) => {
      this._deleteCommentHandler(evt, movie);
    });


    if (oldCardComponent && oldDetailsBlock) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._filmDetailsBlock, oldDetailsBlock);
    } else {
      render(this._container, this._cardComponent);
    }
    // this.renderCardControls(movie);
  }

  /* renderCardControls(movie) {
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

  destroy() {
    remove(this._cardComponent);
    remove(this._filmDetailsBlock);
    document.removeEventListener(`keydown`, this._escKeyHandler);
  }

  shake(block) {
    block.style.animation = `shake ${SHAKE_TIMEOUT / 1000}s`;

    setTimeout(() => {
      block.style.animation = ``;
    }, SHAKE_TIMEOUT);
  }

  _setDataChangeCardHandler(movie) {
    this._cardComponent.setFavoritesClickHandler((evt) => {
      evt.preventDefault();
      const newMovie = MovieModel.clone(movie);
      newMovie.isFavorite = !newMovie.isFavorite;
      this._onDataChange(this, movie, newMovie);
    });

    this._cardComponent.setInWatchlistClickHandler((evt) => {
      evt.preventDefault();
      const newMovie = MovieModel.clone(movie);
      newMovie.isInWatchlist = !newMovie.isInWatchlist;
      this._onDataChange(this, movie, newMovie);
    });

    this._cardComponent.setWatchedClickHandler((evt) => {
      evt.preventDefault();
      const newMovie = MovieModel.clone(movie);
      newMovie.isWatched = !newMovie.isWatched;

      this._onDataChange(this, movie, newMovie);
    });
  }

  _setDataChangePopupHandler(movie) {
    this._filmDetailsBlock.setFavoritesClickHandler(() => {
      const newMovie = MovieModel.clone(movie);
      newMovie.isFavorite = !newMovie.isFavorite;
      this._onDataChange(this, movie, newMovie);
    });

    this._filmDetailsBlock.setInWatchlistClickHandler(() => {
      const newMovie = MovieModel.clone(movie);
      newMovie.isInWatchlist = !newMovie.isInWatchlist;
      this._onDataChange(this, movie, newMovie);
    });

    this._filmDetailsBlock.setWatchedClickHandler(() => {
      const newMovie = MovieModel.clone(movie);
      newMovie.isWatched = !newMovie.isWatched;

      this._onDataChange(this, movie, newMovie);
    });
  }

  _openFilmDetailsHandler(movie) {
    this._onViewChange();
    this._renderMovie(movie);
    this._filmDetailsBlock.rerender();
    document.addEventListener(`keydown`, this._escKeyHandler);
  }

  _setEmojiHandler(evt) {
    const emojiBlock = this._filmDetailsBlock.getElement().querySelector(`.film-details__add-emoji-label`);
    if (emojiBlock.querySelector(`img`)) {
      emojiBlock.querySelector(`img`).remove();
    }
    emojiBlock.append(this._filmDetailsBlock.getEmojiElement(evt.target.value));
  }

  _renderMovie() {
    render(footer, this._filmDetailsBlock, Position.AFTEREND);
    // this._filmDetailsBlock._subscribeOnEvents();
    this._mode = Mode.DETAILS;
  }

  _closeDetailsHandler() {
    // remove(this._filmDetailsBlock);
    this._filmDetailsBlock.getElement().remove();
    this._mode = Mode.DEFAULT;

    document.removeEventListener(`keydown`, this._escKeyHandler);
  }

  _escKeyHandler(evt) {
    if (evt.key === `Escape`) {
      remove(this._filmDetailsBlock);
      this._mode = Mode.DEFAULT;
      document.removeEventListener(`keydown`, this._escKeyHandler);
    }
  }

  _deleteCommentHandler(evt, movie) {
    evt.preventDefault();
    const newMovie = MovieModel.clone(movie);
    const commentId = evt.target.closest(`.film-details__comment`).dataset.commentId;
    const commentIndex = movie.comments.findIndex((comment) => String(comment.id) === commentId);

    this._api.deleteComment(commentId)
    .then(() => {
      newMovie.comments = movie.comments;
      newMovie.comments.splice(commentIndex, 1);
      evt.target.textcontent = `Deleting...`;
      evt.target.setAttribute(`disabled`, `true`);

      // evt.target.closest(`.film-details__comment`).remove();
      this._onDataChange(this, movie, newMovie);
    })
    .catch(() => {
      this.shake(evt.target.closest(`.film-details__comment`));
      evt.target.removeAttribute(`disabled`);
    });

  }

  _addCommentHandler(evt, movie) {
    const newMovie = MovieModel.clone(movie);
    if (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey)) {
      const newCommentData = this._getNewCommentData(this._filmDetailsBlock.getElement().querySelector(`.film-details__new-comment`));
      const newCommentForm = document.querySelector(`.film-details__inner`);
      this._api.createComment(newMovie.id, newCommentData)
        .then(() => {
          newCommentForm.querySelector(`.film-details__comment-input`).style.border = `none`;
          newMovie.comments.splice(movie.comments.length, 0, newCommentData);


          [...newCommentForm.querySelectorAll(`textarea, input`)].forEach((element) => element.setAttribute(`disabled`, `disabled`));
          this._onDataChange(this, movie, newMovie);

        })
        .then(() => this._renderNewComment(newCommentData))
        .catch(() => {
          this.shake(newCommentForm);
          newCommentForm.querySelector(`.film-details__comment-input`).style.border = `2px solid red`;
          [...newCommentForm.querySelectorAll(`textarea, input`)].forEach((element) => element.removeAttribute(`disabled`));
        });
    }
  }

  _renderNewComment(newCommentData) {
    const newComment = new CommentComponent(newCommentData);

    render(this._filmDetailsBlock.getElement().querySelector(`.film-details__comments-list`), newComment);
  }

  _getNewCommentData(commentblock) {
    return {
      id: ``,
      author: ``,
      comment: encode(commentblock.querySelector(`.film-details__comment-input`).value),
      emotion: commentblock.querySelector(`.film-details__emoji-item:checked`).value,
      date: new Date().toISOString()
    };
  }
}
