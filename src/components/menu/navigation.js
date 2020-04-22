import {createElement} from "../utils.js";

const createNavItem = (filter) => {
  return (
    `<a href="#${filter.name.toLowerCase()}" class="main-navigation__item">${filter.name} <span class="main-navigation__item-count">${filter.count}</span></a>`
  );
};

const createFiltersList = (filters) => filters.reduce((filtersList, filter) => {
  filtersList += createNavItem(filter);
  return filtersList;
}, ``);

const createNavigation = (filters) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${createFiltersList(filters)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Menu {
  constructor(filters) {
    this._filters = filters;

    this._element = null;
  }

  getTemplate() {
    return createNavigation(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
