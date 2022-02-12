/**
 * The pacman controller.
 */
class PacmanCtrl {
  /**
   * Reuses the given pacman object.
   */
  constructor(pacman) {
    this.pacman = pacman;
  }

  /**
   * Used to request the next change of direction.
   *
   * @param {Direction} direction
   */
  askToChangeDirection(direction) {
    this.pacman.askToChangeDirection(direction);
  }
}
