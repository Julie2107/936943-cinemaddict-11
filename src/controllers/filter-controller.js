import NavComponent from "../components/menu/navigation.js";
import {FilterType} from "../components/consts.js";
import {render, replace, Position} from "../components/utils.js";

export const filterMovies = {
  'All movies': (movies) => movies,
  'Watchlist': (movies) => movies.filter((movie) => movie.isInWatchlist),
  'History': (movies) => movies.filter((movie) => movie.isWatched),
  'Favorites': (movies) => movies.filter((movie) => movie.isFavorite)
};

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
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

    this._filterComponent = new NavComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent);
    }
  }
  //коллбэк на изменение фильтра
  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
