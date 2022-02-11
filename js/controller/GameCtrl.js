/**
 * The game controller.
 */
class GameCtrl {
  /**
   * Automate the creation of the game and the associated visual.
   */
  constructor() {
    this.game = new Game(RAW_MAZE);
    this.view = new GameView(this.game, this);
    this._pacmanCtrl = new PacmanCtrl(this.game.pacman);
    this._pacmanView = new PacmanView(this._pacmanCtrl);
  }

  /**
   * The game handler.
   */
  run() {
    this.view.updateLives();
    this.view.displayGameOver();
    this.play();
  }

  /**
   * Pauses the game, the sprites movement.
   */
  pause() {
    clearInterval(this._timer);
  }

  /**
   * Makes the sprites movement continues.
   * The game runs all in motion.
   */
  play() {
    this._timer = setInterval(() => {
      this.game.moveSprites();
      if (this.game.pacmanHasBeenEaten()) {
        this.game.respawn();
        this.view.updateLives();
      }
      if (this.game.lvlSucceed()) {
        this.game.nextLevel();
        this.view.nextLevel();
      }
      if (this.game.isGameOver()) {
        console.log("GAME OVER !");
        clearInterval(this._timer);
        this.game.saveScore();
        this.view.displayGameOver();
        this.view.disablePacman();
      }
      this.view.updateFrame();
    }, RUN_INTERVAL);
  }

  /**
   * Applies the start the game request.
   */
  startHasBeenRequested() {
    this.run();
  }
}
