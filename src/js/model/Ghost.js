/**
 * The Ghost class let's create a ghost white the Sprite properties.
 * A ghost runs completely randomly and on its own.
 */
class Ghost extends Sprite {
  /**
   * Reuses the Sprite properties.
   *
   * @param {Position} position the initial position
   * @param {Direction} id the ghost id
   */
  constructor(position, id) {
    /** @returns {Direction} a random direction */
    const randomDirection = () => [
      Direction.NORTH, Direction.SOUTH,
      Direction.EAST,  Direction.WEST
    ].sort(() => 0.5 - Math.random())[0];

    super(position, randomDirection(), id);
    this._getRandomDirection = randomDirection;

    setInterval(() => {
      this._choiceNewDirection();
    }, GHOSTS_RUN_INTERVAL);
  }

  /**
   * Lets the ghost indicate its intention to change direction.
   */
  _choiceNewDirection() {
    this.askToChangeDirection(this._getRandomDirection());
    this.changeDirection();
  }

  /**
   * Returns true if the Pacman and the ghost are at the same position or
   * if the Pacman is at the ghost's previous position and the ghost is at the
   * Pacman's previous position.
   *
   * @param {Pacman} pacman the pacman object
   * @returns {boolean} true if the ghost can ean the pacman.
   */
  canEat(pacman) {
    let ghostPos = JSON.stringify(this.position);
    let pacmanPos = JSON.stringify(pacman.position);
    let ghostPreviousPos = JSON.stringify(this.previousPosition);
    let pacmanPreviousPos = JSON.stringify(pacman.previousPosition);

    return ghostPos === pacmanPos ||
      (ghostPreviousPos === pacmanPos && ghostPos === pacmanPreviousPos);
  }

  /**
   * Indicates an intention to change direction when the ghost is blocked.
   */
  notifyIsBlocked() {
    this._choiceNewDirection();
  }
}
