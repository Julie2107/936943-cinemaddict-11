import {createElement} from "../utils.js";

const createFilmBlock = () => {
  return (
    `<section class="films">
    </section>`
  );
};

export default class FilmBlock {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmBlock();
  }

  getElement() {
    if (!this._element) {
    this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
