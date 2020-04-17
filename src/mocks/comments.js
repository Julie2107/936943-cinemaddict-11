import {getRandomInteger, getRandomDate, generateDate} from "./mocks-utils.js";

const COMMENT_TEXTS = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];

const EMOTIONS = [`smile`, `sleeping`, `puke`, `angry`];

const AUTHORS = [`John Doe`, `Tim Macoveev`, `Kisonka`, `Cinemaddict`];

const generateComment = () => {
  return {
    text: COMMENT_TEXTS[getRandomInteger(COMMENT_TEXTS.length)],
    emotion: EMOTIONS[getRandomInteger(EMOTIONS.length)],
    author: AUTHORS[getRandomInteger(AUTHORS.length)],
    date: generateDate(getRandomDate(new Date(2015, 0, 1), new Date()))
  };
};

export const generateComments = (count) => new Array(count)
    .fill(``)
    .map(generateComment);
