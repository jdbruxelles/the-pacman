/**
 * A wall is a fixed Pacman maze component like a tile or a dot.
 */
class Wall extends Tile {
  /**
   * To be created, a Wall just need an id like a Tile.
   *
   * @param {string} id unique wall's id
   */
  constructor(id) {
    super(id);
  }
}
