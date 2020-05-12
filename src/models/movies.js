export default class Movies {
  constructor() {
    this._movies = [];

    this._dataChangeHandlers = [];
  }
  // получение всех задач
  getMovies() {
    return this._movies;
  }
  // заполнение задач
  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._dataChangeHandlers);
  }
  // обновление одной задачи (убрать из контроллера)
  updateMovie(id, movie) {
    const index = this._movies.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }
  //коллбэк, вызываемый при изменении модели
  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
