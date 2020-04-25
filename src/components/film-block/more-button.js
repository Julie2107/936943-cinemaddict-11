import AbstractComponent from "../abstract-component.js";

const createMoreButton = () => `<button class="films-list__show-more">Show more</button>`;

export default class MoreButton extends AbstractComponent {
  getTemplate() {
    return createMoreButton(this._movies);
  }
}
