import MenuComponent from "../components/menu/menu.js";
import {FilterType} from "../components/consts.js";
import {render, replace} from "../components/utils.js";

export const MenuItem = {
  MOVIES: `movies`,
  STATS: `stats`
};

export const filterMovies = {
  'All movies': (movies) => movies,
  'Watchlist': (movies) => movies.filter((movie) => movie.isInWatchlist),
  'History': (movies) => movies.filter((movie) => movie.isWatched),
  'Favorites': (movies) => movies.filter((movie) => movie.isFavorite)
};

export default class FilterController {
  constructor(container, moviesModel, statsComponent, pageController) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._statsComponent = statsComponent;
    this._pageController = pageController;

    this._filterComponent = null;
    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._menuClickHandler = this._menuClickHandler.bind(this);

    this._moviesModel.setDataChangeHandler(this._dataChangeHandler);
  }

  render() {
    const container = this._container;
    const allMovies = this._moviesModel.getMoviesAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: filterMovies[filterType](allMovies).length,
        checked: filterType === this._activeFilterType
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new MenuComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._filterChangeHandler);
    this._filterComponent.setMenuClickHandler(this._menuClickHandler);
    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent);
    }
  }

  setScreenHandler(handler) {
    this._filterComponent.setMenuClickHandler(handler);
  }
  // коллбэк на изменение фильтра
  _filterChangeHandler(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _menuClickHandler(menuItem) {
    switch (menuItem) {
      case MenuItem.MOVIES:
        this._statsComponent.hide();
        this._pageController.show();
        break;
      case MenuItem.STATS:
        this._statsComponent.show(this._moviesModel.getMoviesAll());
        this._pageController.hide();
        break;
    }
  }

  _dataChangeHandler() {
    this.render();
  }
}
