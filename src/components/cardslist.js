import createCard from "./card.js";

const createCardsList = (amount) => {
  let cardsList = ``;
  for (let i = 0; i < amount; i++) {
    cardsList += createCard();
  }
  return cardsList;
};

export default createCardsList;
