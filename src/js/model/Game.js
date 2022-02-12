/**
 * To be used as the front of the game.
 */
class Game {
  /**
   * To be created, a maze with the given rawMaze data.
   *
   * @param {number[][]} rawMaze the maze object
   */
  constructor(rawMaze) {
    this._maze = new Maze(rawMaze);
    this._pacman = new Pacman(this._maze.pacmanRespawn, Direction.WEST);
    this._ghosts = GHOSTS_ID.map((ghostId) => {
      return new Ghost(this._maze.ghostRespawn, ghostId);
    });
    this._score = 0;
    this._highScore = localStorage.getItem("highScore") || 0;
    this._removedDot;
    this._isPaused = false;
    this._hasStarted = false;
  }

  /** @returns {Maze} the new maze object. */
  get maze() { return this._maze; }

  /** @returns {Pacman} the pacman of the game. */
  get pacman() { return this._pacman; }

  /** @returns {Ghost[]} the list of ghosts. */
  get ghosts() { return this._ghosts; }

  /** @returns {number} the best score ever. */
  get highScore() { return this._highScore; }

  /** @returns {number} the score of the current game. */
  get score() { return this._score; }

  /** @returns {Dot} the last gum to be eaten. */
  get removedDot() { return this._removedDot; }

  /** @returns {boolean} the pause state of the game. */
  get isPaused() { return this._isPaused; }

  /** @returns {boolean} true if the game has started, and else otherwise. */
  get hasStarted() { return this._hasStarted; }

  /** Marks that the game has started. */
  markStart() { this._hasStarted = true; }

  /** Marks that the game has ended. */
  markEnd() { this._hasStarted = false; }

  /** Marks the game as paused. */
  markPause() { this._isPaused = true; }

  /** Marks that the game continues. */
  markPlay() { this._isPaused = false; }

  /**
   * Moves the Pacman.
   */
  moveSprites() {
    let nextPosFromHere = this.pacman.position.nextPosition(this.pacman.direction);
    if (this.pacman.askedToChangeDirection && this.maze.canWalkOn(
      this.pacman.position.nextPosition(this.pacman.askedDirection)
    )) {
      this.pacman.changeDirection();
      this.pacman.move();
    } else if (this.maze.canWalkOn(nextPosFromHere)) {
      this.pacman.move();
    } else if (nextPosFromHere.column < 0) {
      this.pacman.respawnAtTheOpposite(
        new Position(this.pacman.position.row, this.maze.nbColumns)
      );
      this.pacman.move();
    } else if (nextPosFromHere.column >= this.maze.nbColumns) {
      this.pacman.respawnAtTheOpposite(
        new Position(this.pacman.position.row, -1)
      );
      this.pacman.move();
    }

    if (this.maze.canPick(this.pacman.position)) {
      this._removedDot = this.maze.pick(this.pacman.position);
      if (this._removedDot.isEnergizer) {
        this._score += ENERGIZER_DOT_VALUE;
        this.pacman.makeSuper();
      } else {
        this._score += SIMPLE_DOT_VALUE;
      }
    }

    this.ghosts.forEach((ghost) => {
      nextPosFromHere = ghost.position.nextPosition(ghost.direction);
      if (ghost.askedToChangeDirection && this.maze.canWalkOn(
        ghost.position.nextPosition(ghost.askedDirection)
      )) {
        ghost.notifyIsBlocked();
        ghost.move();
      } else if (this.maze.canWalkOn(nextPosFromHere)) {
        ghost.move();
      } else if (nextPosFromHere.column < 0) {
        ghost.respawnAtTheOpposite(
          new Position(ghost.position.row, this.maze.nbColumns)
        );
        ghost.move();
      } else if (nextPosFromHere.column >= this.maze.nbColumns) {
        ghost.respawnAtTheOpposite(new Position(ghost.position.row, -1));
        ghost.move();
      } else {
        ghost.notifyIsBlocked();
      }
    });

    if (this.pacman.isSuper) {
      this.ghosts.forEach((ghost) => {
        if (ghost.canEat(this.pacman)) {
          this.pacman.hasEatenAGhost();
          ghost.hasBeenEaten();
          ghost.respawn();
          this._score += this.pacman.coinsFromGhost;
        }
      });
    }

    for (let i = 0, hasBeenEaten = false; !hasBeenEaten && i < this.ghosts.length; i++) {
      if (this.ghosts[i].canEat(this.pacman)) {
        this.pacman.hasBeenEaten();
        hasBeenEaten = true;
      }
    }
  }

  /**
   * Indicates that the game is over if the Pacman has no life left.
   *
   * @returns {boolean} true if the Pacman has no life left, and else otherwise.
   */
  isGameOver() {
    return this.pacman.nbLives < 0;
  }

  /**
   * Compares the current score with the high score, and save the highest.
   */
  saveScore() {
    if (this._score > this._highScore) {
      this._highScore = this._score;
      localStorage.setItem("highScore", this._highScore);
    }
  }

  /**
   * @returns {boolean} true if pacman has been eaten (dead), and else otherwise.
   */
  pacmanHasBeenEaten() {
    return this.pacman.isDead;
  }

  /**
   * Brings all the sprites back to life.
   */
  respawn() {
    [this.pacman, ...this.ghosts].forEach((sprite) => {
      sprite.respawn();
    });
  }

  /**
   * Checks if the current level is finished.
   *
   * @returns {boolean} true if the current level is finished.
   */
  lvlSucceed() {
    return this._maze.isEmpty();
  }

  /**
   * Creates a new maze and resets the position and direction
   * of the sprites to their initial values.
   */
  nextLevel() {
    this._maze = new Maze(RAW_MAZE);
    this.respawn();
  }
}
