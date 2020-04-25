import AbstractComponent from "./abstract-component.js";

const createFooterStatistics = (filmsamount) => `<p>${filmsamount} movies inside</p>`;

export default class FooterStats extends AbstractComponent {
  constructor(filmsamount) {
    super();

    this._filmsamount = filmsamount;
  }

  getTemplate() {
    return createFooterStatistics(this._filmsamount);
  }
}
