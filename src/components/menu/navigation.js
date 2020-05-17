import AbstractComponent from "../abstract-component.js";

const FILTER_COUNT_STRING = ` 20`;

const getFilterName = (content) => {
  return content.substring(FILTER_ID_PREFIX.length);
};

const createNavItem = (filter) => {
  const isActive = filter.checked ? `main-navigation__item--active` : ``;
  return (
    `<a href="#${filter.name.toLowerCase()}" class="main-navigation__item" ${isActive} data-filter-type="${filter.name}">${filter.name} <span class="main-navigation__item-count">${filter.count}</span></a>`
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
      console.log(evt.target.dataset);
      handler(filterName);
    });
  }
}
