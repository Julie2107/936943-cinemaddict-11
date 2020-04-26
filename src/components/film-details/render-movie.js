import FilmDetailsComponent from "./film-details.js";
import {Position} from "../consts.js";
import {render, escKeyHandler} from "../utils.js";

const closeBtnHandler = (block) => {
  document.body.removeChild(block.getElement());
  document.removeEventListener(`keydown`, escKeyHandler);
};

export const renderMovie = (container, movie) => {
  const filmDetailsBlock = new FilmDetailsComponent(movie);
  render(container, filmDetailsBlock, Position.AFTEREND);

  filmDetailsBlock.setCloseButtonHandler(() => {
    closeBtnHandler(filmDetailsBlock);
  });

  document.addEventListener(`keydown`, (evt) => {
    escKeyHandler(evt, () => {
      closeBtnHandler(filmDetailsBlock);
    });
  });
};
