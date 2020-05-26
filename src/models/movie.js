import {generateDate} from "../mocks/mocks-utils.js";

export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.title = {
      name: data.film_info.title,
      original: data[`film_info`][`alternative_title`]
    }
    this.poster = data[`film_info`][`poster`];
    this.rating = data[`film_info`][`total_rating`];
    this.agerating = data[`film_info`][`age_rating`];

    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.releasedate = generateDate(data[`film_info`][`release`][`date`]);
    this.runtime = data[`film_info`][`runtime`];
    this.country = data[`film_info`][`release`][`release_country`];
    this.genres = data[`film_info`][`genre`];
    this.description = data[`film_info`][`description`];
    this.comments = data[`comments`];
    this.isInWatchlist = data[`user_details`][`watchlist`];
    this.isWatched = data[`user_details`][`already_watched`];
    this.isFavorite = data[`user_details`][`favorite`];
    this.viewDate = generateDate(data[`user_details`][`watching_date`]);

    this.comments = data.comments;
    /*[
      {
      id: data.comments[`id`],
      text: data.comments[`comment`],
      emotion: data.comments[`emotion`],
      author: data.comments[`author`],
      date: generateDate(data.comments[`date`])
      }
    ];*/

  }

  static parseMovie(data) {
    console.log(data);
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }
}
