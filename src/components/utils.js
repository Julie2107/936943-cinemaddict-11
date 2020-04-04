import {Position} from "./consts.js";

const render = (container, template, place = Position.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};

export default render;
