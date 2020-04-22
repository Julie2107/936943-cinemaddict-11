import {createElement} from "./utils.js";

const createFooterStatistics = (filmsamount) => `<p>${filmsamount} movies inside</p>`;

export default class FooterStats {
  constructor(filmsamount) {
    this._filmsamount = filmsamount;

    this._element = null;
  }

  getTemplate() {
    return createFooterStatistics(this._filmsamount);
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
