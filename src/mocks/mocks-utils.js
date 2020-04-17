const MONTHES = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

export const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const generateDate = (date) => {
  return {
    day: date.getDate(),
    month: MONTHES[date.getMonth()],
    integermonth: date.getMonth() + 1,
    year: date.getFullYear(),

    hours: date.getHours(),
    minutes: date.getMinutes()
  };
};

export const getRandomInteger = (max, min = 0) => min + Math.floor(Math.random() * (max - min));

export const getRandomBoolean = () => Math.random() > 0.5;
