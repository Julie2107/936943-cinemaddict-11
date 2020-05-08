const Emoji = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`
};

export const createDetailsNewComment = () => {
  return (
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label"></div>
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>
      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${Emoji.SMILE}" value="${Emoji.SMILE}">
        <label class="film-details__emoji-label" for="emoji-${Emoji.SMILE}">
          <img src="./images/emoji/${Emoji.SMILE}.png" width="30" height="30" alt="emoji">
        </label>
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${Emoji.SLEEPING}" value="${Emoji.SLEEPING}">
        <label class="film-details__emoji-label" for="emoji-${Emoji.SLEEPING}">
          <img src="./images/emoji/${Emoji.SLEEPING}.png" width="30" height="30" alt="emoji">
        </label>
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${Emoji.PUKE}" value="${Emoji.PUKE}">
        <label class="film-details__emoji-label" for="emoji-${Emoji.PUKE}">
          <img src="./images/emoji/${Emoji.PUKE}.png" width="30" height="30" alt="emoji">
        </label>
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${Emoji.ANGRY}" value="${Emoji.ANGRY}">
        <label class="film-details__emoji-label" for="emoji-${Emoji.ANGRY}">
          <img src="./images/emoji/${Emoji.ANGRY}.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </div>`
  );
};
