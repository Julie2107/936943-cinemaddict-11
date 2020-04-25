import AbstractComponent from "../abstract-component.js";

const createFilmBlock = () => {
  return (
    `<section class="films">
    </section>`
  );
};

export default class FilmBlock extends AbstractComponent {
  getTemplate() {
    return createFilmBlock();
  }
}
