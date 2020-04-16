import {getRandomBoolean, getRandomInteger, getRandomDate, generateDate} from "./mocks-utils.js";
import {generateComments} from "./comments.js";

const MAX_RATING = 5;
const MIN_RATING = 1;
const MAX_RUNTIME = 180;
const HOUR = 60;
const MAX_AGERATING = 18;
const MAX_STRINGS_FIELD = 5;

const NAMES = [
  {
    name: `Великий Фламарион`,
    original: `The Great Flamarion`
  },
  {
    name: `Танец жизни`,
    original: `The Dance of Life`
  },
  {
    name: `Полынная тропа`,
    original: `Sagebrush Trail`
  },
  {
    name: `Человек с золотой рукой`,
    original: `The Man with the Golden Arm`
  },
  {
    name: `Санта Клаус завоёвывает марсиан`,
    original: `Santa Claus Conquers the Martians`
  },
  {
    name: `Моряк Попай встречается с Синдбадом-Мореходом`,
    original: `Popeye the Sailor Meets Sindbad the Sailor`
  },
  {
    name: `Созданы друг для друга`,
    original: `Made for Each Other`
  }
];

const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const DIRECTORS = [`Anthony Mann`, `Tim Burton`, `Quentine Tarantino`, `Guy Richie`, `Woody Allen`, `Kevin Smith`];

const WRITERS = [`Anne Wigton`, `Heinz Herald`, `Richard Weil`, `Shonda Rhimes`, `Aaron Sorkin`, `Richard Curtis`, `Seth Rogan`];

const ACTORS = [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`, `Michael Boyarsky`, `Johnny Depp`, `Helena Bohnem-Karter`, `Antony Hopkins`, `Jack Nicholson`, `Woopy Goldberg`];

const COUNTRIES = [`USA`, `Great Britain`, `France`, `Poland`];

const GENRES = [`Drama`, `Film-Noir`, `Mystery`, `Comedy`, `Fantasy`, `Thriller`];


const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const generateRating = () => {
  return (Math.random() * (MAX_RATING - MIN_RATING)).toFixed(1);
};

const generateMixture = (array, count) => {
  let randomArray = [];
  for (let i = 0; i < count; i++) {
    randomArray.push(array[getRandomInteger(array.length, 1)]);
  }
  return randomArray;
};

const getRunTime = () => {
  const totalTime = getRandomInteger(MAX_RUNTIME);
  return {
    hours: Math.floor(totalTime / HOUR),
    minutes: totalTime % HOUR
  };
};

const generateMovie = () => {
  const releaseDate = generateDate(getRandomDate(new Date(1921, 0, 1), new Date()));

  return {
    title: NAMES[getRandomInteger(NAMES.length)],
    poster: POSTERS[getRandomInteger(POSTERS.length)],
    rating: generateRating(),
    agerating: getRandomInteger(MAX_AGERATING),

    director: DIRECTORS[getRandomInteger(DIRECTORS.length)],
    writers: generateMixture(WRITERS, MAX_STRINGS_FIELD).join(`, `),
    actors: generateMixture(ACTORS, MAX_STRINGS_FIELD).join(`, `),
    releasedate: releaseDate,
    runtime: getRunTime(),
    country: COUNTRIES[getRandomInteger(COUNTRIES.length)],
    genres: generateMixture(GENRES, MAX_STRINGS_FIELD),
    description: generateMixture(DESCRIPTIONS, MAX_STRINGS_FIELD).join(` `),

    comments: generateComments(getRandomInteger(MAX_STRINGS_FIELD)),
    controls: {
      isInWatchlist: getRandomBoolean(),
      isWatched: getRandomBoolean(),
      isFavorite: getRandomBoolean(),
    }
  };
};

const generateMovies = (count) => new Array(count)
    .fill(``)
    .map(generateMovie);

export {generateMovie, generateMovies};
