import AbstractSmartComponent from "./abstract-smart-component.js";
import {generateUserRating} from "./utils.js";

const createUserProfile = (watched) => {
  return (
    `<section class="header__profile profile">
        <p class="profile__rating">${generateUserRating(watched)}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
  );
};

export default class Profile extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();
    this._moviesModel = moviesModel;

  }

  getTemplate() {
    return createUserProfile(this._moviesModel.getWatchedMovies(0).length);
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    return;
  }
}
