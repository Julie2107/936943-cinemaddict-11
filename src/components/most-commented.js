import createCardsList from "./cardslist.js";
import {CARDS_AMOUNT_EXTRA} from "./consts.js";

const createMostCommented = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      ${createCardsList(CARDS_AMOUNT_EXTRA)}
      </div>
    </section>`
  );
};

export default createMostCommented;