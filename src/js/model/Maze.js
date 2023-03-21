/**
 * The Maze class is used to model the labyrinth of the Game.
 */
class Maze {
  /**
   * The maze is built according to the following rules:
   * - 0 - this is a completely empty slot;
   * - 1 - it is a wall tile;
   * - 2 - it's an eraser (dot);
   * - 3 - it's a super eraser (energizer);
   * - 4 and 5 – empty slot.
   *
   * @param {number[][]} rawMaze the maze object
   */
  constructor(rawMaze) {
    this._nbRows = rawMaze.table.length;
    this._nbColumns = rawMaze.table[0].length;
    this._layer_wall = new Layer(this._nbRows, this._nbColumns);
    this._layer_dot = new Layer(this._nbRows, this._nbColumns);
    this._nbDots = 0;

    for (let i = 0, id = 1; i < rawMaze.table.length; i++) {
      for (let j = 0; j < rawMaze.table[i].length; j++, id++) {
        switch (rawMaze.table[i][j]) {
          case 1:
            this._layer_wall.setTile(new Position(i, j), new Wall(`w_${id}`));
            break;
          case 2:
            this._layer_dot.setTile(new Position(i, j), new Dot(`d_${id}`, false));
            this._nbDots++;
            break;
          case 3:
            this._layer_dot.setTile(new Position(i, j), new Dot(`d_${id}`, true));
            this._nbDots++;
            break;
          case 4:
            this._pacmanRespawn = new Position(i, j);
            break;
          case 5:
            this._ghostRespawn = new Position(i, j);
            break;
        }
      }
    }
  }

  /**
   * Returns the available wall tile at the given position.
   *
   * @param {Position} pos a non-empty position where to get the tile.
   * @returns {Tile} the tile at the given position.
   */
  getWallLayerTile(pos) {
    if (this._layer_wall.contains(pos)) {
      return this._layer_wall.getTile(pos);
    }
  }

  /**
   * Returns the available eraser tile at the given position.
   *
   * @param {Position} pos a non-empty position where to get the tile.
   * @returns {Tile} the tile at the given position.
   */
  getDotLayerTile(pos) {
    if (this._layer_dot.contains(pos)) {
      return this._layer_dot.getTile(pos);
    }
  }

  /**
   * Checks if the position is part of the maze and if there is no
   * collision with a wall at the given position, false otherwise.
   *
   * @param {Position} pos the position to be tested.
   * @returns {boolean}
   */
  canWalkOn(pos) {
    return this._layer_wall.contains(pos) && !this._layer_wall.hasTile(pos);
  }

  /**
   * Checks if the position is part of the maze and if there is a dot to take.
   *
   * @param {Position} pos the position of the tile.
   * @returns {boolean} true if the position is part of the maze
   * and if there is a dot to take, and false otherwise.
   */
  canPick(pos) {
    return this._layer_dot.contains(pos) && this._layer_dot.hasTile(pos);
  }

  /**
   * Returns the dot (normal or energetic) that is in the given position.
   * Throws an error if there is nothing.
   *
   * @param {Position} pos the position where to pick a dot.
   * @returns {Dot} the picked dot.
   */
  pick(pos) {
    if (this._layer_dot.hasTile(pos)) {
      const tile = this._layer_dot.getTile(pos);
      this._layer_dot.setTile(pos, undefined);
      this._nbDots--;
      return tile;
    }

    throw new Error("There is no dot at the given position.");
  }

  /** @returns {boolean} true if all the dots have been eaten. */
  isEmpty() { return this._nbDots === 0; }

  /** @returns {number} the number of lines of the maze. */
  get nbRows() { return this._nbRows; }

  /** @returns {number} the number of columns of the maze. */
  get nbColumns() { return this._nbColumns; }

  /** @returns {Position} the initial position of the Pacman. */
  get pacmanRespawn() { return this._pacmanRespawn; }

  /** @returns {Position} the initial position of the ghosts. */
  get ghostRespawn() { return this._ghostRespawn; }
}
