import CardComponent from "./card.js";

import {renderMovie} from "../film-details/render-movie.js";
import {render} from "../utils.js";

const footer = document.querySelector(`.footer`);

const openFilmDetailsHandler = (movie) => {
  renderMovie(footer, movie);
};

export const renderCard = (filmsListElement, movie) => {
  const cardComponent = new CardComponent(movie);
  render(filmsListElement, cardComponent);

  cardComponent.setDetailsHandler(`.film-card__poster`, () => {
    openFilmDetailsHandler(movie);
  });

  cardComponent.setDetailsHandler(`.film-card__title`, () => {
    openFilmDetailsHandler(movie);
  });

  cardComponent.setDetailsHandler(`.film-card__comments`, () => {
    openFilmDetailsHandler(movie);
  });
};
