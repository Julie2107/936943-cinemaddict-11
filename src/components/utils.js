import {Position, EscKeys} from "./consts.js";

const DECIMAL = 10;

export const escKeyHandler = (evt, action) => {
  const isEscKey = evt.key === EscKeys.ESCAPE || evt.key === EscKeys.ESC;
  if (isEscKey) {
    action();
    document.removeEventListener(`keydown`, escKeyHandler);
  }
};

export const isDouble = (num) => num >= DECIMAL ? `${num}` : `0${num}`;

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place = Position.BEFOREEND) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTEREND:
      container.after(element);
      break;
  }
};
