import AbstractComponent from "./abstract-component.js";

const createFooterStatistics = (filmsamount) => `<p>${filmsamount} movies inside</p>`;

export default class FooterStats extends AbstractComponent {
  constructor(filmsamount) {
    super();

    this._filmsAmount = filmsamount;
  }

  getTemplate() {
    return createFooterStatistics(this._filmsAmount);
  }
}
