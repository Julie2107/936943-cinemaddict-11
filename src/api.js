import Movie from "./models/movie.js";

const StatusCode = {
  OK: 200,
  MULTIPLE: 300,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const Url = {
  MOVIES: `movies`,
  COMMENTS: `comments`
};

const checkStatus = (response) => {
  if (response.status >= StatusCode.OK && response.status < StatusCode.MULTIPLE) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({url: `${Url.MOVIES}`})
      .then((response) => response.json())
      .then((movies) => Promise.all(movies.map((movie) => this._getComments(movie))))
      .then(Movie.parseMovies);

  }

  updateMovie(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then((response) => response.json())
    .then((movie) => this._getComments(movie))
    .then(Movie.parseMovie);
  }

  createComment(id, commentData) {
    return this._load({
      url: `comments/${id}`,
      method: Method.POST,
      body: JSON.stringify(commentData),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then((response) => response.json());
  }

  deleteComment(id) {
    return this._load({
      url: `comments/${id}`,
      method: Method.DELETE
    });
  }

  _getComments(movie) {
    return this._load({url: `${Url.COMMENTS}/${movie.id}`})
        .then((response) => response.json())
        .then((commentsList) => Object.assign({}, movie, {comments: commentsList}));
  }

  _load({url, method = `GET`, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
