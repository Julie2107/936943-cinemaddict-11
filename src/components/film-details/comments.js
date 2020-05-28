import AbstractComponent from "../abstract-smart-component.js";
import {generateDate} from "../../mocks/mocks-utils.js";

const createDetailsComment = (comment) => {
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${comment.date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createCommentsList = (commentsList, comment) => {
  commentsList += createDetailsComment(comment);
  return commentsList;
};

export const createDetailsCommentsList = (comments) => comments.reduce(createCommentsList, ``);

export default class Comment extends AbstractComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    const getCommentDate = (date) => {
      const commentDate = generateDate(date);
      return `${commentDate.year}/${commentDate.integermonth}/${commentDate.day} ${commentDate.hours}:${commentDate.minutes}`;
    };
    return (
      `<li class="film-details__comment" data-comment-id="${this._comment.id}">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${this._comment.emotion}.png" width="55" height="55" alt="emoji-${this._comment.emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${this._comment.comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${this._comment.author}</span>
            <span class="film-details__comment-day">${getCommentDate(this._comment.date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    );
  }
}
