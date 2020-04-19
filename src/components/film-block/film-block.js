import {createFilmsList} from "./films-list.js";
import {createMostCommented} from "./most-commented.js";
import {createTopRated} from "./top-rated.js";


const createFilmBlock = (movies, toprated, commented) => {
  return (
    `<section class="films">
    ${createFilmsList(movies)}
    ${createTopRated(toprated)}
    ${createMostCommented(commented)}
    </section>`
  );
};

export default createFilmBlock;
