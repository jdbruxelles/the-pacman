/**
 * A position of the game components.
 */
class Position {
  /**
   * To be created, a row and a column numbers for a position.
   *
   * @param {number} row the line index (0 being the top row).
   * @param {number} column the column index (0 being the left column).
   */
  constructor(row, column) {
    this._row = row;
    this._column = column;
  }

  /** @returns {number} the row position */
  get row() { return this._row; }

  /** @returns {number} the column position */
  get column() { return this._column; }

  /**
   * Returns the next position in the given direction.
   *
   * @param {Direction} dir the direction from which to get the next position.
   * @returns {Position} the next position in the given direction.
   */
  nextPosition(dir) {
    return new Position(this.row + dir.deltaRow, this.column + dir.deltaColumn);
  }
}
