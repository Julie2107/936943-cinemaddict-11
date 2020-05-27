import CardComponent from "../components/filmcard/card.js";
import FilmDetailsComponent from "../components/film-details/film-details.js";
import CommentComponent from "../components/film-details/comments.js";
import MovieModel from "../models/movie.js";
import {encode} from "he";
// import CardControlsComponent from "../components/filmcard/card-controls.js";
import {render, remove, replace} from "../components/utils.js";
import {generateDate} from "../mocks/mocks-utils.js";
import {Position} from "../components/consts.js";

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};
const footer = document.querySelector(`.footer`);

export const EmptyComment = {};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
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
    const commentId = evt.target.closest(`.film-details__comment`).dataset.commentId;
    evt.target.closest(`.film-details__comment`).remove();

    const commentIndex = movie.comments.findIndex((comment) => String(comment.id) === commentId);
    movie.comments.splice(commentIndex, 1);
    this._onDataChange(this, movie, Object.assign({}, movie, movie.comments));
  }

  _addCommentHandler(evt, movie) {

    if (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey)) {
      const newCommentData = this._getNewCommentData(this._filmDetailsBlock.getElement().querySelector(`.film-details__new-comment`));
      if (newCommentData === undefined) {
        this._filmDetailsBlock.getElement().querySelector(`.film-details__comment-input`).setCustomValidity(`Please complete all the fields`);
        return;
      }

      this._renderNewComment(newCommentData);

      movie.comments.splice(movie.comments.length, 0, newCommentData);
      this._onDataChange(this, movie, Object.assign({}, movie, movie.comments));

    }
  }

  _renderNewComment(newCommentData) {
    const newComment = new CommentComponent(newCommentData);

    render(this._filmDetailsBlock.getElement().querySelector(`.film-details__comments-list`), newComment);
  }

  _getNewCommentData(commentblock) {
    return {
      id: Math.random(),
      text: encode(commentblock.querySelector(`.film-details__comment-input`).value),
      emotion: commentblock.querySelector(`.film-details__emoji-item:checked`).value,
      author: `Cinemaddict`,
      date: generateDate(new Date())
    };
  }
}
