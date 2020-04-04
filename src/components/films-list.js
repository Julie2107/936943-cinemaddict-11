import createCardsList from "./cardslist.js";
import {CARDS_AMOUNT} from "./consts.js";

const createFilmsList = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
      ${createCardsList(CARDS_AMOUNT)}
      </div>
    </section>`
  );
};

export default createFilmsList;
