import FilmDetailsComponent from "./film-details.js";
import {Position} from "../consts.js";
import {render, escKeyHandler} from "../utils.js";

const closeBtnHandler = (block) => {
  document.body.removeChild(block.getElement());
};

export const renderMovie = (container, movie) => {
  const filmDetailsBlock = new FilmDetailsComponent(movie);
  render(container, filmDetailsBlock.getElement(), Position.AFTEREND);

  const closeBtn = filmDetailsBlock.getElement().querySelector(`.film-details__close-btn`);

  closeBtn.addEventListener(`click`, () => {
    closeBtnHandler(filmDetailsBlock);
    document.removeEventListener(`keydown`, escKeyHandler);
  });

  document.addEventListener(`keydown`, (evt) => {
    escKeyHandler(evt, () => {
      closeBtnHandler(filmDetailsBlock);
    });
  });
};
