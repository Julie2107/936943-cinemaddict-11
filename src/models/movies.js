import {FilterType} from "../components/consts.js";
import {filterMovies} from "../controllers/filter-controller.js";
import SortType from "../components/sorter/sort.js";
import {generateUserRating} from "../components/utils.js";
import {formatRuntime} from "../components/utils.js";
import moment from "moment";


export default class Movies {
  constructor() {
    this._movies = [];
    this._activeFilterType = FilterType.ALL; // текущий выбранный фильтр
    this._activeSortType = SortType.Default;

    this._comments = this._movies.comments;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = []; // здесь хранятся коллбэки на изменение фильтров
    this._sortChangeHandlers = [];
  }
  // получение фильтрованных фильмов
  getMovies() {
    return filterMovies[this._activeFilterType](this._movies);
  }

  // получение всех фильмов
  getMoviesAll() {
    return this._movies;
  }
  // заполнение задач
  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._dataChangeHandlers);

  }
  // подписка снаружи на изменение фильтра (вызываем все коллбэки, кот. подписаны на именение фильтра)
  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  // изменение сортировки

  setSorter(sorterType) {
    this._activeSortType = sorterType;
    this._callHandlers(this._sortChangeHandlers);
  }
  // обновление одной задачи
  updateMovie(id, movie) {
    const index = this._movies.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  removeComment(id, movie) {
    const index = movie.comments.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    movie.comments = [].concat(movie.comments.slice(0, index), movie.comments.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  getWatchedMovies(period) {
    const watchedMovies = this._movies.filter((movie) => movie.isWatched);
    if (period === 0) {
      return watchedMovies;
    }

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - period);

    const filteredMovies = watchedMovies.slice().filter((movie) => moment(movie.viewDate).format() >= moment(currentDate).format());
    return filteredMovies;
  }

  getUserRating(movies) {
    const totalRunTime = movies.reduce((total, movie) => {
      total += movie.runtime;
      return total;
    }, 0);
    return {
      number: movies.length,
      rank: generateUserRating(movies.length),
      totalTime: formatRuntime(totalRunTime)
    };
  }

  addComment(comment, movie) {
    movie.comments = [].concat(comment, movie.comments);
    this._callHandlers(this._dataChangeHandlers);
  }
  // обновление модели при изменении фильтра
  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }
  // коллбэк, вызываемый при изменении модели
  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
