export const createDetailsPoster = (movie) => {
  return (
    `<div class="film-details__poster">
      <img class="film-details__poster-img" src="${movie.poster}" alt="">
      <p class="film-details__age">${movie.agerating}+</p>
    </div>`
  );
};
