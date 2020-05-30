import AbstractSmartComponent from "../abstract-smart-component.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from "moment";
import {formatRuntime} from "../utils.js";

const UserRating = {
  NOVICE: {
    name: `novice`,
    min: 1
  },
  FAN: {
    name: `fan`,
    min: 11
  },
  BUFF: {
    name: `movie buff`,
    min: 21
  }
};

export const generateUserRating = (watched) => {
  if (watched >= UserRating.BUFF.min) {
    return UserRating.BUFF.name;
  } else if (watched >= UserRating.FAN.min) {
    return UserRating.FAN.name;
  } else if (watched >= UserRating.NOVICE.min) {
    return UserRating.NOVICE.name;
  }
  return ``;
};


export default class Stats extends AbstractSmartComponent {
  constructor(movies) {
    super();
    this._chart = null;
    this._movies = movies;
  }

  createStatistics(movies)  {
    return (
      `<section class="statistic">
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">${this.getUserRating().rank}</span>
        </p>

        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
          <label for="statistic-today" class="statistic__filters-label">Today</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
          <label for="statistic-week" class="statistic__filters-label">Week</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
          <label for="statistic-month" class="statistic__filters-label">Month</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
          <label for="statistic-year" class="statistic__filters-label">Year</label>
        </form>

        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">${this.getUserRating().number} <span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">${this.getUserRating().totalTime.hours} <span class="statistic__item-description">h</span> ${this.getUserRating().totalTime.minutes} <span class="statistic__item-description">m</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${this._getTopGenre()}</p>
          </li>
        </ul>

        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>

      </section>`
    )
  }

  getTemplate() {
    return this.createStatistics(this._movies);
  }

  show(movies) {
    super.show();

    this.rerender(movies);
  }

  render() {
    this._renderChart();
  }

  getUserRating() {
    const isWatchedMovies = this._movies.filter((movie) => movie.isWatched);
    const totalRunTime = isWatchedMovies.reduce((total, movie) => total += movie.runtime, 0);
    return {
      number: isWatchedMovies.length,
      rank: generateUserRating(isWatchedMovies.length),
      totalTime: formatRuntime(totalRunTime)
    }
  }

  _getTopGenre() {
    const genres = this._getAmountByGenre();
    if (genres.length !== 0) {
      return genres[0].genre;
    }
    return `0`
  }

  getTopGenre() {
    const isWatchedMovies = this._movies.filter((movie) => movie.isWatched);
    const singleGenres = [];

    return isWatchedMovies.reduce((genres, movie) => {
      movie.genres.forEach((genre) => {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      });
      return genres;
    }, []);
  }

  _getMoviesGenres() {

    const isWatchedMovies = this._movies.filter((movie) => movie.isWatched);
    return isWatchedMovies.reduce((genres, movie) => {
      movie.genres.forEach((genre) => {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      });
      return genres;
      }, []);
  }

  _getAmountByGenre() {
    const moviesGenres = this._getMoviesGenres();
    const isWatchedMovies = this._movies.filter((movie) => movie.isWatched);
    return moviesGenres.map((genre) => {
      return {
        genre,
        count: isWatchedMovies.filter((movie) => movie.genres.includes(genre)).length,
      };
    }).sort((prevGenre, nextGenre) => nextGenre.count - prevGenre.count);
  }


  recoveryListeners() {}

  rerender(movies) {
    this._movies = movies;

    super.rerender();
    this._renderCharts();
  }

  _renderCharts() {
    this._renderChart();

  }

  _renderChart() {
    const chartDataMovies = this._getAmountByGenre();
    const BAR_HEIGHT = 50;
    const statisticCtx = document.querySelector(`.statistic__chart`);
    statisticCtx.height = BAR_HEIGHT * 5;

    this._Chart = new Chart(statisticCtx, {
        plugins: [ChartDataLabels],
        type: `horizontalBar`,
        data: {
            labels: chartDataMovies.map((movie) => movie.genre),
            datasets: [{
                data: chartDataMovies.map((movie) => movie.count),
                backgroundColor: `#ffe800`,
                hoverBackgroundColor: `#ffe800`,
                anchor: `start`
            }]
        },
        options: {
            plugins: {
                datalabels: {
                    font: {
                        size: 20
                    },
                    color: `#ffffff`,
                    anchor: 'start',
                    align: 'start',
                    offset: 40,
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: `#ffffff`,
                        padding: 100,
                        fontSize: 20
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    barThickness: 24
                }],
                xAxes: [{
                    ticks: {
                        display: false,
                        beginAtZero: true
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        }
    });
  }

  _resetCharts() {

  }
}
