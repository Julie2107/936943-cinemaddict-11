import {createDetailsPoster} from "./details-poster.js";
import {createDetailsHead} from "./details-head.js";
import {createDetailsTable} from "./details-table.js";
import {createDetailsDesc} from "./details-desc.js";
import {createDetailsControls} from "./details-controls.js";
import {createDetailsCommentsList} from "./comments.js";
import {createDetailsNewComment} from "./comment-new.js";
import AbstractComponent from "../abstract-component.js";

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
          ${createDetailsControls(movie.controls)}
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

export default class FilmDetails extends AbstractComponent {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return createFilmDetails(this._movies);
  }
}
