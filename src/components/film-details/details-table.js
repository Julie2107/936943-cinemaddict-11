import {formatRuntime, generateDate} from "../utils.js";

const createGenresMarkup = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const createGenresList = (genres) => genres.reduce((genresList, genre) => {
  genresList += createGenresMarkup(genre);
  return genresList;
}, ``);

export const createDetailsTable = (movie) => {

  const getReleaseDate = (date) => `${generateDate(date).day} ${generateDate(date).month} ${generateDate(date).year}`;

  const isMultipleGenre = movie.genres.length > 1 ? `Genres` : `Genre`;

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
        <td class="film-details__cell">${formatRuntime(movie.runtime).hours}h ${formatRuntime(movie.runtime).minutes}m</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${movie.country}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">${isMultipleGenre}</td>
        <td class="film-details__cell">
          ${createGenresList(movie.genres)}
      </tr>
    </table>`
  );
};
