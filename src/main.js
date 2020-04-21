import {CARDS_AMOUNT, CARDS_AMOUNT_RENDER, CARDS_AMOUNT_EXTRA, Position, ExtraTitle} from "./components/consts.js";
import FilmBlockComponent from "./components/film-block/film-block.js";
import MenuComponent from "./components/menu/navigation.js";
import SortComponent from "./components/sorter/sort.js";
import ProfileComponent from "./components/user-profile.js";
import FilmDetailsComponent from "./components/film-details/film-details.js";
import FilmsListComponent from "./components/film-block/films-list.js";
import CardComponent from "./components/filmcard/card.js";
import FilmsListExtraComponent from "./components/film-block/films-list-extra.js";
import {render} from "./components/utils.js";
import {generateMovies} from "./mocks/movie.js";
import FooterStatsComponent from "./components/footer-statistics.js";
import {generateFilters} from "./mocks/filters.js";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatsBlock = footer.querySelector(`.footer__statistics`);

export const movies = generateMovies(CARDS_AMOUNT);

const filters = generateFilters(movies);
const watchedNumber = filters[filters.findIndex((filter) => filter.name === `History`)].count;

const moviesFirst = movies.slice(0, CARDS_AMOUNT_RENDER);
const moviesTop = movies.sort((prevMovie, nextMovie) => nextMovie.rating - prevMovie.rating).slice(0, CARDS_AMOUNT_EXTRA);
const moviesCommented = movies.sort((prevMovie, nextMovie) => nextMovie.comments.length - prevMovie.comments.length).slice(0, CARDS_AMOUNT_EXTRA);

export const renderMovie = (container, movie) => {
  const filmDetailsBlock = new FilmDetailsComponent(movie);
  render(container, filmDetailsBlock.getElement(), Position.AFTEREND);
console.log(filmDetailsBlock.getElement())
  const closeBtn = filmDetailsBlock.getElement().querySelector(`.film-details__close-btn`);
  closeBtn.addEventListener(`click`, function () {
    document.body.removeChild(filmDetailsBlock.getElement());

  });
}

export const renderCard = (filmsListElement, movie) => {
  const cardComponent = new CardComponent(movie);
  render(filmsListElement, cardComponent.getElement());

  const poster = cardComponent.getElement().querySelector(`.film-card__poster`);
  const title = cardComponent.getElement().querySelector(`.film-card__title`);
  const comments = cardComponent.getElement().querySelector(`.film-card__comments`);

  poster.addEventListener(`click`, function () {
    const filmDetailsBlock = new FilmDetailsComponent(movie);
    renderMovie(footer, movie);
  });

};

const renderFilmsBlock = (movies) => {
  const filmsBlock = new FilmBlockComponent();
  render(main, filmsBlock.getElement());

  render(filmsBlock.getElement(), new FilmsListComponent(movies).getElement());

  const filmsListBlock = filmsBlock.getElement().querySelector(`.films-list__container`);

  moviesFirst.forEach((movie) => {
    renderCard(filmsListBlock, movie);
  });

  const topratedBlock = new FilmsListExtraComponent(ExtraTitle.TOPRATED).getElement();
  render(filmsBlock.getElement(), topratedBlock)

  moviesTop.forEach((movie) => {
    renderCard(topratedBlock.querySelector(`.films-list__container`), movie);
  });
  const commentedBlock = new FilmsListExtraComponent(ExtraTitle.COMMENTED).getElement();
  render(filmsBlock.getElement(), commentedBlock);

  moviesCommented.forEach((movie) => {
    renderCard(commentedBlock.querySelector(`.films-list__container`), movie);
  });

  const loadMoreButton = document.querySelector(`.films-list__show-more`);

  const loadMoreHandler = () => {
    const loadedCards = filmsListBlock.querySelectorAll(`article`);
    const nextLoading = loadedCards.length + CARDS_AMOUNT_RENDER;
    const nextMoviesLoad = movies.slice(loadedCards.length, nextLoading).forEach((movie) =>
    renderCard(filmsListBlock, movie));
    if (nextLoading >= movies.length) {
      loadMoreButton.remove();
    }
  };

  loadMoreButton.addEventListener(`click`, loadMoreHandler);
}

const init = () => {
  render(header, new ProfileComponent(watchedNumber).getElement());
  render(main, new MenuComponent(filters).getElement(), Position.AFTERBEGIN);
  render(main, new SortComponent().getElement());
  renderFilmsBlock(movies);
  render(footerStatsBlock, new FooterStatsComponent(movies.length).getElement());
};

init();
