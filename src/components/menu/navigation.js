import AbstractComponent from "../abstract-component.js";

const MenuClass = {
MOVIES: `main-navigation__item`,
STATS: `main-navigation__additional`
}

export const MenuItem = {
MOVIES: `movies`,
STATS: `stats`
}

const createNavItem = (filter) => {
  return (
      `<a href="#${filter.name.toLowerCase()}" class="main-navigation__item" data-menu-item ="${MenuItem.MOVIES}">${filter.name} <span class="main-navigation__item-count">${filter.count}</span></a>`
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
      <a href="#stats" class="main-navigation__additional" data-menu-item ="${MenuItem.STATS}">Stats</a>
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

  setMenuClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      console.log(`click`);
      this._setActiveClass(evt);
      const menuItem = evt.target.dataset.menuItem;
      handler(menuItem);
    })
  }

  setFilterChangeHandler(handler) {
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const getFilterName = (targetData) => {
        return targetData.replace(`#${targetData[1]}`, targetData[1].toUpperCase());
      }
      const filterName = getFilterName(evt.target.getAttribute(`href`));
      //this._setActiveClass(evt);
      handler(filterName);
    });
  }

  _setActiveClass(evt) {
    [...this.getElement().querySelectorAll(`.${MenuClass.MOVIES}, .${MenuClass.STATS}` )].forEach((item) => {
      item.classList.remove(`${MenuClass.MOVIES}--active`);
      item.classList.remove(`${MenuClass.STATS}--active`);
      if (evt.target === item) {
        const itemClass = evt.target.classList;
        evt.target.classList.add(`${itemClass}--active`);
      }
    });
  }
}
