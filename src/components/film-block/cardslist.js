import createCard from "./card.js";

const createCardsList = (movies) => movies.reduce((cardsList, movie) => {
  cardsList += createCard(movie);
  return cardsList;
}, ``);

export default createCardsList;
