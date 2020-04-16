import {createDetailsPoster} from "./film-details/details-poster.js";
import {createDetailsHead} from "./film-details/details-head.js";
import {createDetailsTable} from "./film-details/details-table.js";
import {createDetailsDesc} from "./film-details/details-desc.js";
import {createDetailsControls} from "./film-details/details-controls.js";
import {createDetailsCommentsList} from "./film-details/comments.js";
import {createDetailsNewComment} from "./film-details/comment-new.js";

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

export default createFilmDetails;
