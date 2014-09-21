(function() {
  // The div which will display the game of life. 
  var grid_div = $("#grid");

  // When clicked, this will load the previous initial configuration.
  var prev_button = $("#prev_button");
  
  // When clicked, this will load the next initial configuration.
  var next_button = $("#next_button");

  // When clicked, it will pause the game. When clicked again, the game resumes.
  var start_stop_button = $("#start_stop_button");

  // When clicked, the cells are deleted and the user can click cells to enable them.
  // Then when the button is clicked again, the game starts with the given conditions.
  var reset_done_button = $("#reset_done_button");

  // When clicked, some cells on the board will randomly be brought to life.
  var random_spawn_button = $("#random_spawn_button");

  // Manages the game logic for the Game of Life.
  var life = LIFE.Life();

  // Sits on top of the DOM and draws a grid.
  var dom_grid = LIFE.DOMGrid(grid_div, LIFE.canvas_size, LIFE.canvas_dimension);
  
  // Array of updates that must be made to the board after a step has been taken (see the step function in the Life class).
  var updates;

  // The index of the configuration (i.e. an index in LIFE.initial_states) which started off this Game of Life. 
  var current_config = 0;

  // We take one step in the game at regular intervals and update the game board. The result of the setInterval call is this object.
  var interval;

  // Hide the previous button if there is no previous configuration, hide the next button if there is no next configuration.
  var update_button_visibilities = function() {
    if (current_config === 0) {
      prev_button.css("visibility", "hidden");
    } else {
      prev_button.css("visibility", "visible");
    }
    if (current_config === LIFE.initial_states.length - 1) {
      next_button.css("visibility", "hidden");
    } else {
      next_button.css("visibility", "visible");
    }
  };

  // Reset the Game of Life using the array of initial live cells.
  var reset = function(initial_cells) {
    // Reset the game logic.
    life.reset(initial_cells);

    // Clear the grid.
    dom_grid.clearGrid();

    // Draw the live cells on the grid.
    for (var i in initial_cells) {
      var sq = initial_cells[i];
      dom_grid.fillSquare(sq.x, sq.y);
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
        dom_grid.clearSquare(updates[i].x, updates[i].y);
      } else {
        dom_grid.fillSquare(updates[i].x, updates[i].y);
      }
    }
  };

  // Load the previous configuration when the prev_button is clicked.
  prev_button.click(function() {
    current_config--;
    reset(LIFE.initial_states[current_config]);
  });

  // Load the next configuration when the next_button is clicked.
  next_button.click(function() {
    start_stop_button.text("Stop");
    current_config++;
    reset(LIFE.initial_states[current_config]);
  });

  // When the stop button is clicked, toggle it to say "Start" and stop the game.
  // When the start button is clicked, toggle it to say "Stop" and start the game.
  start_stop_button.click(function() {
    var button_text = start_stop_button.text();
    if (button_text === "Stop") {
      start_stop_button.text("Start");
      clearInterval(interval);
    } else if (button_text === "Start") {
      start_stop_button.text("Stop");
      clearInterval(interval);
      interval = setInterval(function() {
        update();
      }, 100);
    }
  });

  reset_done_button.click(function() {
    var button_text = reset_done_button.text();
    if (button_text === "Reset") {
      next_button.css("visibility", "hidden");
      prev_button.css("visibility", "hidden");
      random_spawn_button.css("visibility", "hidden");
      start_stop_button.css("visibility", "hidden");
      clearInterval(interval);
      dom_grid.clearGrid();
      alert("Click squares to make them alive or dead and then click Done");
      dom_grid.enableToggleSquareOnClick();
      reset_done_button.text("Done");
    } else if (button_text === "Done") {
      next_button.css("visibility", "visible");
      prev_button.css("visibility", "visible");
      random_spawn_button.css("visibility", "visible");
      start_stop_button.css("visibility", "visible");
      start_stop_button.text("Stop");
      reset(dom_grid.get_live_squares());
      reset_done_button.text("Reset");
      dom_grid.disableToggleSquareOnClick();
    }
  });

  // Load the first configuration.
  reset(LIFE.initial_states[current_config]);
})();
