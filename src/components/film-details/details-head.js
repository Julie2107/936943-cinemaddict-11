export const createDetailsHead = (movie) => {
  return (
    `<div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${movie.title.name}</h3>
        <p class="film-details__title-original">${movie.title.original}</p>
      </div>
      <div class="film-details__rating">
        <p class="film-details__total-rating">${movie.rating}</p>
      </div>
    </div>`
  );
};
