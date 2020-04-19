import createCardsList from "../filmcard/cardslist.js";
import createMoreButton from "./more-button.js";

export const createFilmsList = (movies) => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
      ${createCardsList(movies)}
      </div>
      ${createMoreButton()}
    </section>`
  );
};
