import AbstractSmartComponent from "../abstract-smart-component.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const NO_GENRE = `0`;

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
  constructor(moviesModel) {
    super();
    this._moviesModel = moviesModel;
    this._filter = `all-time`;
    this._chart = null;
    this._chartData = [];
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
      this.rerender();
    });
  }

  createStatistics(movies, activeFilter) {

    return (
      `<section class="statistic">
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">${this._moviesModel.getUserRating(this._moviesModel.getWatchedMovies(StatsFilterValue[`all-time`])).rank}</span>
        </p>

        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>
          ${createStatsFilterMarkup(StatsFilter, activeFilter)}
        </form>

        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">${this._moviesModel.getUserRating(movies).number} <span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">${this._moviesModel.getUserRating(movies).totalTime.hours} <span class="statistic__item-description">h</span> ${this._moviesModel.getUserRating(movies).totalTime.minutes} <span class="statistic__item-description">m</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${this._getTopGenre(movies)}</p>
          </li>
        </ul>

        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>

      </section>`
    );
  }

  getTemplate() {
    return this.createStatistics(this._moviesModel.getWatchedMovies(StatsFilterValue[this._filter]), this._filter);
  }

  show() {
    super.show();
    this.rerender();
  }

  render() {
    this._setChartData();
    this._renderChart();
    this.setFilterStatisticsChangeHandler();
  }

  recoveryListeners() {
    this.setFilterStatisticsChangeHandler();
  }

  rerender() {
    this._setChartData();
    super.rerender();
    this._renderChart();
    super.show();
  }

  _getTopGenre(movies) {
    const genres = this._getAmountByGenre(movies);
    if (genres.length !== 0) {
      return genres[0].genre;
    }
    return NO_GENRE;
  }

  _getMoviesGenres(movies) {
    return movies.reduce((genres, movie) => {
      movie.genres.forEach((genre) => {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      });
      return genres;
    }, []);
  }

  _getAmountByGenre(movies) {
    const moviesGenres = this._getMoviesGenres(movies);
    return moviesGenres.map((genre) => {
      return {
        genre,
        count: movies.filter((movie) => movie.genres.includes(genre)).length,
      };
    }).sort((prevGenre, nextGenre) => nextGenre.count - prevGenre.count);
  }

  _setChartData() {
    this._chartData = this._getAmountByGenre(this._moviesModel.getWatchedMovies(StatsFilterValue[this._filter]));
  }

  _renderChart() {
    const BAR_HEIGHT = 50;
    const statisticCtx = document.querySelector(`.statistic__chart`);
    statisticCtx.height = BAR_HEIGHT * this._chartData.length;
    this._Chart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._chartData.map((movie) => movie.genre),
        datasets: [{
          data: this._chartData.map((movie) => movie.count),
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

}
