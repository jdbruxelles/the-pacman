/**
 * The GameView class will centralise the display of
 * each game component; tiles, Pacman and ghosts.
 */
class GameView {
  /**
   * When the Game object is created, the labyrinth (walls and dots),
   * the Pacman and the ghosts are displayed on the page.
   */
  constructor(game, gameCtrl) {
    this._game = game;
    this._gameCtrl = gameCtrl;
    this._nbRows = game.maze.nbRows;
    this._nbColumns = game.maze.nbColumns;

    this._updateMazeArea();
    this._createMaze();
    this.updateLives();
    this.showHighScore();

    $("#pacman-container").append(
      $("<button>", {
        text: "Start",
        id: "start",
        class: "jdb-button jdb-round-xl jdb-margin-8 jdb-black" +
          " jdb-hover-blue-o jdb-border jdb-border-w2 jdb-ripple" +
          " jdb-text-shadow-multiple-dark"
      }).one("click", (event) => {
        this.startGame();
        $(event.target).click(() => {
          if (!this._game.isGameOver()) {
            this._togglePause();
          }
        }).html(
          $("<span>",{
            "aria-hidden": true,
            class: "fa jdb-margin-right fa-pause",
            style: "top:-3px; position:relative"
          })
        ).append($("<span>").text("Pause"));
        $(".mz-pacman").removeClass("not-started");
      })
    );

    $(window).on("keydown", (event) => {
      switch (event.key.toLowerCase()) {
        case "p":
          if (this._game.hasStarted) {
            this._togglePause();
          }
          break;
        case "s":
          if (!this._game.hasStarted) {
            $("#start").click();
          }
          break;
        case "r": window.location.reload(); break;
      }
    });
  }

  /**
   * Toggle pause state and the pause button.
   */
  _togglePause() {
    let $startButton = $("#pacman-container").find("#start");
    if (this._game.isPaused) {
      this._game.markPlay();
      this._gameCtrl.play();

      $(".mz-pacman").removeClass("not-started");
      $startButton.find("span:first-child").removeClass("fa-play").addClass("fa-pause");
      $startButton.find("span:last-child").text("Pause");
    } else {
      this._game.markPause();
      this._gameCtrl.pause();

      $(".mz-pacman").addClass("not-started");
      $startButton.find("span:first-child").removeClass("fa-pause").addClass("fa-play");
      $startButton.find("span:last-child").text("Play");
    }
  }

  /**
   * Sets the height and width of the scene according
   * to the number of rows and columns in this maze.
   */
  _updateMazeArea() {
    $("#maze-area").css({
      height: `${TILE_SIZE * this._nbRows}px`,
      width: `${TILE_SIZE * this._nbColumns}px`
    });
  }

  /**
   * Adds the maze components in the page.
   */
  _createMaze() {
    /**
     * Returns a span element created by jQuery.
     *
     * @param {object} properties an object of html attributes and CSS.
     * @param {string} properties.class the class name.
     * @param {string} properties.id the element id.
     * @param {number} properties.top the absolute top position.
     * @param {number} properties.left the absolute let position.
     * @returns {object} the jQuery object element.
     */
    const $newTile = (properties) => $("<span>", {
      class: properties.class,
      id: properties.id
    }).css({ top, left } = properties);

    let $mazeArea = $("#maze-area");
    let i, j, left, top, id = 1;

    for (i = 0; i < this._nbRows; i++) {
      for (j = 0; j < this._nbColumns; j++, id++) {
        top = `${TILE_SIZE * i}px`;
        left = `${TILE_SIZE * j}px`;

        if (this._game.maze.getWallLayerTile(new Position(i, j))) {
          $mazeArea.append($newTile({ class: "mz-wall", top, left }));
        } else if (this._game.maze.getDotLayerTile(new Position(i, j))) {
          if (this._game.maze.getDotLayerTile(new Position(i, j)).isEnergizer) {
            $mazeArea.append(
              $newTile({
                class: "mz-pac-dot energizer",
                id: `d_${id}`,
                top, left
              })
            );
          } else {
            $mazeArea.append(
              $newTile({
                class: "mz-pac-dot",
                id: `d_${id}`,
                top, left
              })
            );
          }
        }
      }
    }

    // Add the pacman to the UI.
    $mazeArea.append(
      $newTile({
        class: "mz-pacman not-started",
        top: `${TILE_SIZE * this._game.maze.pacmanRespawn.row}px`,
        left: `${TILE_SIZE * this._game.maze.pacmanRespawn.column}px`
      })
    );

    // Add ghosts to the UI.
    GHOSTS_ID.forEach((ghostClass) => {
      $mazeArea.append(
        $newTile({
          class: `ghost ${ghostClass}`,
          top: `${TILE_SIZE * this._game.maze.ghostRespawn.row}px`,
          left: `${TILE_SIZE * this._game.maze.ghostRespawn.column}px`
        })
      );
    });
  }

  /**
   * Updates the game in the UI.
   */
  updateFrame() {
    // Update the position of the pacman on the page.
    $(".mz-pacman").css({
      top: `${TILE_SIZE * this._game.pacman.position.row}px`,
      left: `${TILE_SIZE * this._game.pacman.position.column}px`
    }).attr("data-dir", () => {
      switch (this._game.pacman.direction) {
        case Direction.NORTH: return "to-top"
        case Direction.EAST:  return "to-right"
        case Direction.WEST:  return "to-left"
        case Direction.SOUTH: return "to-bottom"
      }
    });

    // Update the position of the ghosts on the page.
    $.each(GHOSTS_ID, (index, id) => {
      $(`.ghost.${id}`).css({
        top: `${TILE_SIZE * this._game.ghosts[index].position.row}px`,
        left: `${TILE_SIZE * this._game.ghosts[index].position.column}px`
      });
    });

    if (this._game.removedDot) {
      $(`#${this._game.removedDot.id}`).remove();
      $("#current-score").find("span").text(this._game.score);
      if (this._game.removedDot.isEnergizer && this._game.pacman.isSuper) {
        $("#current-score").find("span")
          .addClass("jdb-text-green").delay(1e3).queue(function(){
            $(this).removeClass("jdb-text-green").dequeue();
          });
      }
    }
  }

  /**
   * Updates the number of views in the UI.
   */
  updateLives() {
    let $liveArea = $("#lives-area");
    $liveArea.empty();
    for (let i = 0; i < this._game.pacman.nbLives; i++) {
      $liveArea.append($("<span>"));
    }
  }

  /**
   * Displays the given message on the
   * info panel at the end of the game.
   * @param {string} message the message to display.
   */
  displayEndOfGameMsg(message) {
    $("#info-panel").html(message).slideDown();
  }

  /**
   * Hides the info panel.
   */
  hideEndOfGameMsg() {
    $("#info-panel").html("").slideUp();
  }

  /**
   * Displays the current high score in the UI.
   */
  showHighScore() {
    $("#high-score").text(this._game.highScore);
  }

  /**
   * Marks the Pacman as not eating.
   */
  disablePacman() {
    $(".mz-pacman").addClass("not-started");
  }

  /**
   * Marks the Pacman as eating.
   */
  enablePacman() {
    $(".mz-pacman").removeClass("not-started");
  }

  /**
   * Updates the UI of the game for the next level.
   */
  nextLevel() {
    $("#maze-area").empty();
    this._updateMazeArea();
    this._createMaze();
  }

  /**
   * Asks to start the game.
   */
  startGame() {
    this._gameCtrl.startHasBeenRequested();
  }
}
