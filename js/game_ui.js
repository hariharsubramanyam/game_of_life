(function() {
  // The canvas which will display the Game of Life.
  var canvas = document.getElementById("canvas");

  // When clicked, this will load the previous initial configuration.
  var prev_button = document.getElementById("prev_button");
  
  // When clicked, this will load the next initial configuration.
  var next_button = document.getElementById("next_button");

  // Manages the game logic for the Game of Life.
  var life = new LIFE.Life();

  // Sits on top of the canvas and draws a grid.
  var canvas_grid = new LIFE.CanvasGrid(canvas, LIFE.canvas_size, LIFE.canvas_dimension);
  
  // Array of updates that must be made to the board after a step has been taken (see the step function in the Life class).
  var updates;

  // The index of the configuration (i.e. an index in LIFE.initial_states) which started off this Game of Life. 
  var current_config = 0;

  // We take one step in the game at regular intervals and update the game board. The result of the setInterval call is this object.
  var interval;

  // Hide the previous button if there is no previous configuration, hide the next button if there is no next configuration.
  var update_button_visibilities = function() {
    if (current_config === 0) {
      prev_button.style.visibility = "hidden";
    } else {
      prev_button.style.visibility = "visible";
    }
    if (current_config === LIFE.initial_states.length - 1) {
      next_button.style.visibility = "hidden";
    } else {
      next_button.style.visibility = "visible";
    }
  };

  // Reset the Game of Life using the array of initial live cells.
  var reset = function(initial_cells) {
    // Reset the game logic.
    life.reset(initial_cells);

    // Clear the grid.
    canvas_grid.clearGrid();

    // Draw the live cells on the grid.
    for (var i in initial_cells) {
      var sq = initial_cells[i];
      canvas_grid.fillSquare(sq.x, sq.y);
    }
    
    update_button_visibilities();
    
    // Remove the old update interval and create a new one.
    clearInterval(interval);
    interval = setInterval(function() {
      update();
    }, 100);
  };

  // Take a step in the Game of Life and update the canvas grid.
  var update = function() {
    updates = life.step();

    for (var i in updates) {
      if (updates[i].state === "Dead") {
        canvas_grid.clearSquare(updates[i].x, updates[i].y);
      } else {
        canvas_grid.fillSquare(updates[i].x, updates[i].y);
      }
    }
  };

  // Load the previous configuration when the prev_button is clicked.
  prev_button.onclick = function() {
    current_config--;
    reset(LIFE.initial_states[current_config]);
  };

  // Load the next configuration when the next_button is clicked.

  next_button.onclick = function() {
    current_config++;
    reset(LIFE.initial_states[current_config]);
  };

  // Load the first configuration.
  reset(LIFE.initial_states[current_config]);
})();
