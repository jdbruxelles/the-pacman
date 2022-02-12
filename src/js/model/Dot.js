/**
 * A dot is a fixed Pacman maze component like a wall or a tile.
 */
class Dot extends Tile {
  /**
   * To be created, a Dot with a unique id,
   * can be marked has an energizer or not.
   *
   * @param {string} id unique dot's id.
   * @param {boolean} isEnergizer lets know if this is a "super eraser".
   */
  constructor(id, isEnergizer) {
    super(id);
    this._isEnergizer = isEnergizer;
  }

  /** @returns {boolean} the energizer state of the dot. */
  get isEnergizer() { return this._isEnergizer; }
}
