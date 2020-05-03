import AbstractComponent from "../abstract-component.js";

const createNoFilms = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`
  );
};

export default class NoFilms extends AbstractComponent {
  getTemplate() {
    return createNoFilms(this._title);
  }
}