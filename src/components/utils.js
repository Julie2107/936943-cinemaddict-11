import {Position, EscKeys} from "./consts.js";

const DECIMAL = 10;
const HOUR = 60;

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

export const render = (container, component, place = Position.BEFOREEND) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case Position.BEFOREEND:
      container.append(component.getElement());
      break;
    case Position.AFTEREND:
      container.after(component.getElement());
      break;
    case Position.BEFOREBEGIN:
      container.before(component.getElement());
      break;
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const formatRuntime = (runtime) => {
  return {
    hours: Math.floor(runtime / HOUR),
    minutes: runtime % HOUR
  };
};
