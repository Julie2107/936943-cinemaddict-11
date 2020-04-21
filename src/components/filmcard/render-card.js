import CardComponent from "./card.js";

import {renderMovie} from "../film-details/render-movie.js";
import {render} from "../utils.js";

const footer = document.querySelector(`.footer`);

const openFilmDetailsHandler = (movie) => {
  renderMovie(footer, movie);
};

export const renderCard = (filmsListElement, movie) => {
  const cardComponent = new CardComponent(movie);
  render(filmsListElement, cardComponent.getElement());

  const poster = cardComponent.getElement().querySelector(`.film-card__poster`);
  const title = cardComponent.getElement().querySelector(`.film-card__title`);
  const comments = cardComponent.getElement().querySelector(`.film-card__comments`);

  poster.addEventListener(`click`, () => {
    openFilmDetailsHandler(movie);
  });
  title.addEventListener(`click`, () => {
    openFilmDetailsHandler(movie);
  });
  comments.addEventListener(`click`, () => {
    openFilmDetailsHandler(movie);
  });
};
