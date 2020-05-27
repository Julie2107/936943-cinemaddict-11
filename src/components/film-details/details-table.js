import {isDouble} from "../utils.js";
import moment from "moment";

const HOUR = 60;

export const generateDate = (date) => {
  return {
    day: moment(date).format(`DD`),
    month: moment(date).format(`MMMM`),
    integermonth: moment(date).format(`MM`),
    year: moment(date).format(`YYYY`),
    hours: moment(date).format(`HH`),
    minutes: moment(date).format(`mm`)
  };
};


const createGenresMarkup = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const createGenresList = (genres) => genres.reduce((genresList, genre) => {
  genresList += createGenresMarkup(genre);
  return genresList;
}, ``);

const getReleaseDate = (date) => `${generateDate(date).day} ${generateDate(date).month} ${generateDate(date).year}`;

export const createDetailsTable = (movie) => {
  const formatRuntime = (runtime) => `${Math.floor(runtime / HOUR)}h ${runtime % HOUR}m`;

  return (
    `<table class="film-details__table">
      <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${movie.director}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">${movie.writers}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${movie.actors}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">${getReleaseDate(movie.releasedate)}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${formatRuntime(movie.runtime)}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${movie.country}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Genres</td>
        <td class="film-details__cell">
          ${createGenresList(movie.genres)}
      </tr>
    </table>`
  );
};
