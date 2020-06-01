export const CARDS_AMOUNT = 10;
export const CARDS_AMOUNT_EXTRA = 2;
export const CARDS_AMOUNT_RENDER = 5;

export const Position = {
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
  AFTERBEGIN: `afterbegin`,
  BEFOREBEGIN: `beforebegin`
};

export const EscKeys = {
  ESCAPE: `Escape`,
  ESC: `Esc`
};

export const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`
};

export const UserRating = {
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

export const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`,
};

export const AbstractMethodsError = {
  CONSTRUCTOR: `Can't instantiate AbstractComponent, only concrete one.`,
  TEMPLATE: `Abstract method not implemented: getTemplate`,
  RECOVERY: `Abstract method not implemented: recoveryListeners`
};
