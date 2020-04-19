import {Position} from "./consts.js";

const DECIMAL = 10;

export const isDouble = (num) => num >= DECIMAL ? `${num}` : `0${num}`;

export const render = (container, template, place = Position.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};
