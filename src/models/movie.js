export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.title = {
      name: data.film_info.title,
      original: data[`film_info`][`alternative_title`]
    };
    this.poster = data[`film_info`][`poster`];
    this.rating = data[`film_info`][`total_rating`];
    this.agerating = data[`film_info`][`age_rating`];

    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.releasedate = data[`film_info`][`release`][`date`];
    this.runtime = data[`film_info`][`runtime`];
    this.country = data[`film_info`][`release`][`release_country`];
    this.genres = data[`film_info`][`genre`];
    this.description = data[`film_info`][`description`];
    this.comments = data[`comments`];
    this.isInWatchlist = data[`user_details`][`watchlist`];
    this.isWatched = data[`user_details`][`already_watched`];
    this.isFavorite = data[`user_details`][`favorite`];
    this.viewDate = data[`user_details`][`watching_date`];
  }

  toRAW(clone = false) {
    return {
      "id": this.id,
      "comments": clone ? this.comments : this.comments.map(({id}) => id),
      "film_info": {
        "title": this.title.name,
        "alternative_title": this.title.original,
        "total_rating": this.rating,
        "poster": this.poster,
        "age_rating": this.agerating,
        "director": this.director,
        "writers": this.writers,
        "actors": this.actors,
        "release": {
          "date": this.releasedate,
          "release_country": this.country
        },
        "runtime": this.runtime,
        "genre": this.genres,
        "description": this.description
      },
      "user_details": {
        "watchlist": this.isInWatchlist,
        "already_watched": this.isWatched,
        "watching_date": this.viewDate,
        "favorite": this.isFavorite
      }
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(data) {
    return new Movie(data.toRAW(true));
  }
}
