import {isDouble} from "../utils.js";

const createGenresMarkup = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const createGenresList = (genres) => genres.reduce((genresList, genre) => {
  genresList += createGenresMarkup(genre);
  return genresList;
}, ``);

const getReleaseDate = (date) => `${isDouble(date.day)} ${date.month} ${date.year}`;

export const createDetailsTable = (movie) => {
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
        <td class="film-details__cell">${movie.runtime.hours}h ${movie.runtime.minutes}m</td>
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
