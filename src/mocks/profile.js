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
