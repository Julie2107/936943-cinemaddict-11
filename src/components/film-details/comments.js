import {isDouble} from "../utils.js";

const getCommentDate = (date) => `${date.year}/${isDouble(date.integermonth)}/${isDouble(date.day)} ${isDouble(date.hours)}:${isDouble(date.minutes)}`;

const createDetailsComment = (comment) => {
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${getCommentDate(comment.date)}</span>
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
