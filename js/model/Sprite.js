/**
 * A sprite is a moving element in the game (e.g.: Pacman or ghosts).
 */
class Sprite extends Component {
  /**
   * To be created, an initial position, direction and sprite id.
   *
   * @param {Position} position the position of the sprite.
   * @param {Direction} direction the direction in which the sprite moves.
   * @param {number} id sprite id
   */
  constructor(position, direction, id) {
    super(id);
    this._position = position;
    this._direction = direction;
    this._askedToChangeDirection = false;
    this._askedDirection = direction;
    this._previousPosition = position;
    this._initialPosition = position;
    this._initialDirection = direction;
    this._isDead = false;
  }

  /**
   * @returns {Position} the position of the sprite.
   */
  get position() {
    return this._position;
  }

  /**
   * @returns {Direction} the direction in which the sprite moves.
   */
  get direction() {
    return this._direction;
  }

  /**
   * @returns {boolean} true if a request for a change of direction has been made.
   */
  get askedToChangeDirection() {
    return this._askedToChangeDirection;
  }

  /**
   * @returns {Direction} the asked direction.
   */
  get askedDirection() {
    return this._askedDirection;
  }

  /**
   * @returns {Direction} the previous position of the sprite.
   */
  get previousPosition() {
    return this._previousPosition;
  }

  /**
   * @returns {boolean} the dead state of the sprite.
   */
  get isDead() {
    return this._isDead;
  }

  /**
   * Moves the sprite in its direction.
   */
  move() {
    this._previousPosition = this._position;
    this._position = this._position.nextPosition(this._direction);
  }

  /**
   * Makes the Sprite appear at the other end of the maze
   * using the given position of the end side.
   *
   * @param {Position} oppositePosition the position of the end side.
   */
  respawnAtTheOpposite(oppositePosition) {
    this._position = oppositePosition;
  }

  /**
   * Used to request the next change of direction.
   *
   * @param {Direction} direction the direction to change to
   */
  askToChangeDirection(direction) {
    this._askedToChangeDirection = true;
    this._askedDirection = direction;
  }

  /**
   * Performs the change of direction of the sprite.
   */
  changeDirection() {
    this._direction = this._askedDirection;
    this._askedToChangeDirection = false;
  }

  /** DOESN'T DO ANYTHING */
  notifyIsBlocked() {}

  /** States that the sprite is dead. */
  hasBeenEaten() { this._isDead = true; }

  /**
   * Brings the sprite back to life by resetting its position,
   * direction and the dead state.
   */
  respawn() {
    this._isDead = false;
    this._position = this._initialPosition;
    this._direction = this._initialDirection;
  }
}
