/**
 * The powerful, the pleasurable, the indestructible Pacman.
 */
class Pacman extends Sprite {
  /**
   * Reuses the Sprite properties.
   *
   * @param {Position} position the initial position
   * @param {Direction} direction the initial direction
   */
  constructor(position, direction) {
    super(position, direction, PACMAN_ID);
    this._nbLives = PACMAN_LIVES;
    this._isSuper = false;
    this._powerGain = PACMAN_POWER_GAIN;
  }

  /** @returns {number} the number of lives of the pacman. */
  get nbLives() { return this._nbLives; }

  /** @returns {boolean} the state of the super power mode to eat ghosts. */
  get isSuper() { return this._isSuper; }

  /**
   * @returns {number} the coins obtained by the Pacman after eating a ghost
   * in the current super power mode.
   */
  get coinsFromGhost() {
    return ENERGIZER_DOT_VALUE * this._powerGain;
  }

  /** Takes a life from the Pacman and states that the sprite is dead. */
  hasBeenEaten() {
    this._nbLives--;
    this._isDead = true;
  }

  /** Adds +1 to the ghosts eaten count for the current super power mode. */
  hasEatenAGhost() { this._powerGain++; }

  /**
   * Gives the super power of the pacman to eat ghosts. This super power mode
   * expires after a delay, then the Pacman becomes normal and can be eaten.
   */
  makeSuper() {
    this._isSuper = true;
    clearTimeout(this._powerTimeout);
    this._powerTimeout = setTimeout(() => {
      this._isSuper = false;
      this._powerGain = PACMAN_POWER_GAIN;
    }, PACMAN_POWER_DELAY);
  }
}
