import {generateUserRating} from "../mocks/profile.js";
import AbstractComponent from "./abstract-component.js";

const createUserProfile = (watched) => {
  return (
    `<section class="header__profile profile">
        <p class="profile__rating">${generateUserRating(watched)}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
  );
};

export default class Profile extends AbstractComponent {
  constructor(watched) {
    super();
    this._watched = watched;
  }

  getTemplate() {
    return createUserProfile(this._watched);
  }
}
