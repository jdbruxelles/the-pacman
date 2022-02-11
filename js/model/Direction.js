/**
 * Lets to describe the directions that the sprites can take.
 */
class Direction {
  /**
   * Creates a description of the directions that sprites can take.
   *
   * @param {number} deltaRow the delta on the horizontal axis which
   * allows the direction to be described:
   * - the value 1 represents the down direction;
   * - the value -1 represents the up direction.
   * @param {number} deltaColumn the delta on the vertical axis which
   * allows the direction to be described:
   * - the value 1 represents the right direction;
   * - the value -1 represents the left direction.
   */
  constructor(deltaRow, deltaColumn) {
    this._deltaRow = deltaRow;
    this._deltaColumn = deltaColumn;
  }

  /**
   * @returns {number} the delta value on the horizontal axis.
   */
  get deltaRow() {
    return this._deltaRow;
  }

  /**
   * @returns {number} the delta value on the vertical axis.
   */
  get deltaColumn() {
    return this._deltaColumn;
  }
}

Direction.NORTH = new Direction(-1, 0);
Direction.SOUTH = new Direction(1, 0);
Direction.WEST = new Direction(0, -1);
Direction.EAST = new Direction(0, 1);
