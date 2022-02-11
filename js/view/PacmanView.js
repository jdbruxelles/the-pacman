/**
 * The PacmanView class will handle the interaction with the user.
 */
class PacmanView {
  /**
   * To be constructed, the keystroke events
   * to move the pacman on some direction.
   */
  constructor(pacmanCtrl) {
    $(window).on("keydown", (event) => {
      // The following `event.preventDefault()` prevent the page from
      // scrolling horizontally or vertically using the navigation keys.
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          pacmanCtrl.askToChangeDirection(Direction.NORTH);
          break;
        case "ArrowRight":
          event.preventDefault();
          pacmanCtrl.askToChangeDirection(Direction.EAST);
          break;
        case "ArrowDown":
          event.preventDefault();
          pacmanCtrl.askToChangeDirection(Direction.SOUTH);
          break;
        case "ArrowLeft":
          event.preventDefault();
          pacmanCtrl.askToChangeDirection(Direction.WEST);
          break;
      }
    });

    // Controls on click...
    $("#pacman-controls-btn #go-up").click(() => {
      pacmanCtrl.askToChangeDirection(Direction.NORTH);
    });
    $("#pacman-controls-btn #go-right").click(() => {
      pacmanCtrl.askToChangeDirection(Direction.EAST);
    });
    $("#pacman-controls-btn #go-down").click(() => {
      pacmanCtrl.askToChangeDirection(Direction.SOUTH);
    });
    $("#pacman-controls-btn #go-left").click(() => {
      pacmanCtrl.askToChangeDirection(Direction.WEST);
    });
  }
}
