import {generateUserRating} from "../mocks/profile.js";
import {createElement} from "./utils.js";

const createUserProfile = (watched) => {
  return (
    `<section class="header__profile profile">
        <p class="profile__rating">${generateUserRating(watched)}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
  );
};

export default class Profile {
  constructor(watched) {
    this._watched = watched;

    this._element = null;
  }

  getTemplate() {
    return createUserProfile(this._watched);
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
