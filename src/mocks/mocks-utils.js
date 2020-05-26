import moment from "moment";

/* const MONTHES = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];*/

export const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const generateDate = (date) => {
  return {
    day: moment(date).format(`DD`),
    month: moment(date).format(`MMMM`),
    integermonth: moment(date).format(`MM`),
    year: moment(date).format(`YYYY`),
    hours: moment(date).format(`HH`),
    minutes: moment(date).format(`mm`)
  };
};

export const getRandomInteger = (max, min = 0) => min + Math.floor(Math.random() * (max - min));

export const getRandomBoolean = () => Math.random() > 0.5;
