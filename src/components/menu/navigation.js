import AbstractComponent from "../abstract-component.js";

const createNavItem = (filter) => {
  return (
    `<a href="#${filter.name.toLowerCase()}" class="main-navigation__item" data-filter-type="${filter.name}">${filter.name} <span class="main-navigation__item-count">${filter.count}</span></a>`
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
        ${createFiltersList(filters)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createNavigation(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const filterName = evt.target.dataset.filterType;
      this._setActiveClass(evt);
      handler(filterName);
    });
  }

  _setActiveClass(evt) {
    [...this.getElement().querySelectorAll(`.main-navigation__item`)].forEach((item) => {
      if (evt.target === item) {
        evt.target.classList.add(`main-navigation__item--active`);
      } else {
        item.classList.remove(`main-navigation__item--active`);
      }
    });
  }
}
