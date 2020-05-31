import AbstractSmartComponent from "../abstract-smart-component.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {formatRuntime} from "../utils.js";
import moment from "moment";

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

const StatsFilter = [
  {
    name: `All time`,
    id: `all-time`
  },
  {
    name: `Today`,
    id: `today`
  },
  {
    name: `Week`,
    id: `week`
  },
  {
    name: `Month`,
    id: `month`
  },
  {
    name: `Year`,
    id: `year`
  }
];

const StatsFilterValue = {
  'all-time': 0,
  'today': 1,
  'week': 7,
  'month': 30,
  'year': 365
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

const createStatsFilterItem = (filter, activeFilter) => {
  const isChecked = activeFilter === filter.id ? ` checked` : ``;
  //  const checkedFilter = isChecked ? `checked` : ``;
  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filter.id}" value="${filter.id}" ${isChecked}>
    <label for="statistic-${filter.id}" class="statistic__filters-label">${filter.name}</label>`
  );
};

const createStatsFilterMarkup = (filters, activeFilter) => filters.reduce((filtersList, filter) => {
  filtersList += createStatsFilterItem(filter, activeFilter);
  return filtersList;
}, ``);


export default class Stats extends AbstractSmartComponent {
  constructor(movies) {
    super();
    this._chart = null;
    this._movies = movies;
    this._filter = `all-time`;
    this._chartData = [];
  }

  createStatistics(movies, activeFilter) {
    return (
      `<section class="statistic">
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">${this.getUserRating().rank}</span>
        </p>

        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>
          ${createStatsFilterMarkup(StatsFilter, activeFilter)}
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
    );
  }

  getTemplate() {
    return this.createStatistics(this._movies, this._filter);
  }

  show(movies) {
    super.show();

    this.rerender(movies);
  }

  render() {
    this._renderChart();
    this.setFilterStatisticsChangeHandler();
  }

  recoveryListeners() {
    this.setFilterStatisticsChangeHandler();
  }

  rerender(movies) {
    this._movies = movies;
    console.log(movies);
    super.rerender();
    this._renderChart();
    super.show();
  }

  setFilterStatisticsChangeHandler() {
    this.getElement().querySelector(`.statistic__filters`)
    .addEventListener(`change`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const filterType = evt.target.value;
      this._filter = filterType;
      //this._getFilteredMovies(filterType, this._movies)
      this.rerender(this._getFilteredMovies(filterType, this._movies));
    });
  }

  getUserRating() {
    const isWatchedMovies = this._getWatchedMovies();
    const totalRunTime = isWatchedMovies.reduce((total, movie) => {
      total += movie.runtime;
      return total;
    }, 0);
    return {
      number: isWatchedMovies.length,
      rank: generateUserRating(isWatchedMovies.length),
      totalTime: formatRuntime(totalRunTime)
    };
  }

  _getWatchedMovies() {
    return this._movies.filter((movie) => movie.isWatched);
  }

  _getTopGenre() {
    const genres = this._getAmountByGenre();
    if (genres.length !== 0) {
      return genres[0].genre;
    }
    return `0`;
  }

  _getAmountByGenre() {
    const moviesGenres = this._getMoviesGenres();
    const isWatchedMovies = this._getWatchedMovies();
    return moviesGenres.map((genre) => {
      return {
        genre,
        count: this._movies.filter((movie) => movie.genres.includes(genre)).length,
      };
    }).sort((prevGenre, nextGenre) => nextGenre.count - prevGenre.count);
  }

  _getMoviesGenres() {
    const isWatchedMovies = this._getWatchedMovies();
    return isWatchedMovies.reduce((genres, movie) => {
      movie.genres.forEach((genre) => {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      });
      return genres;
    }, []);
  }

  _getFilteredMovies(filterType, movies) {
    const filterPeriod = StatsFilterValue[filterType];
    if (filterType === 0) {
      return movies;
    }

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - filterPeriod);

    const filteredMovies = movies.slice().filter((movie) => moment(movie.viewDate).format() >= moment(currentDate).format());
    return filteredMovies;
  }

  _renderChart() {
    const chartDataMovies = this._getAmountByGenre();
    const BAR_HEIGHT = 50;
    const statisticCtx = document.querySelector(`.statistic__chart`);
    statisticCtx.height = BAR_HEIGHT * chartDataMovies.length;

    this._Chart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: chartDataMovies.map((movie) => movie.genre),
        datasets: [{
          data: chartDataMovies.map((movie) => movie.count),
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`,
          barThickness: 24
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
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
            }
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
