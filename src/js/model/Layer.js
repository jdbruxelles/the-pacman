/**
 * The Layer class group a set of tiles to form a level.
 */
class Layer {
  /**
   * To be created, rows number, columns number and
   * an empty layer of two-dimensional tiles.
   *
   * @param {number} nbRows number of lines.
   * @param {number} nbColumns number of columns.
   */
  constructor(nbRows, nbColumns) {
    this._nbRows = nbRows;
    this._nbColumns = nbColumns;
    this._tiles = Array(nbRows).fill().map(() => Array(nbColumns));
  }

  /**
   * Checks if the position belongs to the layer board.
   *
   * @param {Position} pos the position to check.
   * @returns {boolean} true whether the position belongs to the layer board
   * (row/column between 0 and number of rows/columns -1).
   */
  contains(pos) {
    return pos.row >= 0 && pos.row <= this._nbRows -1 &&
      pos.column >= 0 && pos.column <= this._nbColumns -1;
  }

  /**
   * Places a tile at the given position in the layer.
   *
   * @param {Position} pos the position where to add a tile.
   * @param {Tile} tile the tile to set at the given position.
   */
  setTile(pos, tile) {
    if (!this.contains(pos)) throw new Error("Invalid position.");
    this._tiles[pos.row][pos.column] = tile;
  }

  /**
   * Returns the tile on the layer at the given position.
   *
   * @param {Position} pos the position from which to get a tile.
   * @returns {Tile} the tile on the layer at the given position.
   */
  getTile(pos) {
    if (!this.contains(pos)) throw new Error("Invalid position.");
    return this._tiles[pos.row][pos.column];
  }

  /**
   * Checks if the given position contains a tile and is not a empty.
   *
   * @param {Position} pos the position from which to check the existence of a tile.
   * @returns {boolean} true if the given position contains a tile and is not a empty.
   */
  hasTile(pos) {
    if (!this.contains(pos)) throw new Error("Invalid position.");
    return this._tiles[pos.row][pos.column] !== undefined;
  }
}
