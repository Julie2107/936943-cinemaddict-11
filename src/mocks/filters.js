const countFilter = (array, flag) => array.reduce((total, movie) => {
  if (movie.controls[flag]) {
    total++;
  }
  return total;
}, 0);

export const generateFilters = (movies) => {
  return [
    {
      name: `Watchlist`,
      count: countFilter(movies, `isInWatchlist`)
    },
    {
      name: `History`,
      count: countFilter(movies, `isWatched`),
    },
    {
      name: `Favorites`,
      count: countFilter(movies, `isFavorite`)
    }
  ];
};
