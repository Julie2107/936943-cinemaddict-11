import createCardsList from "./cardslist.js";

export const createMostCommented = (movies) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      ${createCardsList(movies)}
      </div>
    </section>`
  );
};
