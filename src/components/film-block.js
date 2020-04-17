import {createFilmsList} from "./film-block/films-list.js";
import {createMostCommented} from "./film-block/most-commented.js";
import {createTopRated} from "./film-block/top-rated.js";


const createFilmBlock = (movies, toprated, commented) => `<section class="films">
${createFilmsList(movies)}
${createTopRated(toprated)}
${createMostCommented(commented)}
</section>`;

export default createFilmBlock;
