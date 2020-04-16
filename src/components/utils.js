import {Position} from "./consts.js";

export const isDouble = (num) => num > 9 ? `${num}` : `0${num}`;

export const render = (container, template, place = Position.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};
