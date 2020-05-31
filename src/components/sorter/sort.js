import AbstractComponent from "../abstract-component.js";
import {SortType} from "../consts.js";

const createSort = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currenSortType = SortType.DEFAULT;
    this._sortHandler = this._sortHandler.bind(this);
  }

  getTemplate() {
    return createSort();
  }

  getSortType() {
    return this._currenSortType;
  }

  resetSort() {
    this._currenSortType = SortType.DEFAULT;
    this._setActiveClass(this.getElement().querySelector(`.sort__button:first-child`));
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, this._sortHandler(handler));
  }

  _sortHandler(handler) {
    return (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      this._setActiveClass(evt.target);
      handler(this._currenSortType);
    };
  }

  _setActiveClass(target) {
    [...this.getElement().querySelectorAll(`.sort__button`)].forEach((item) => {
      if (target === item) {
        target.classList.add(`sort__button--active`);
      } else {
        item.classList.remove(`sort__button--active`);
      }
    });
  }
}
