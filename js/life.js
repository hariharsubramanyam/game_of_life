(function() {
  /**
   * Game logic for the Game of Life.
   * @constructor
   */
  var Life = function() { 
    /*
     * This object's keys are two-element arrays of the form [x, y] where x represents the x-coordinate of the cell
     * and y represents the y-coordinate of the cell. The values associated with the keys are not important.
     *
     * This object serves as a set (specifically, it offers fast lookups, insertions, and deletions) where the keys represent
     * the live cells.
     */
    var live_cells = {};
    
    /**
     * Clears the entire game board and sets the given cells as live cells.
     * @param {Array} live_cells - Array of objects indicating the live cells. 
     *                                For each obj in live_cells, (obj.x, obj.y) should be the location of a live cell. 
     */
    var reset = function(initial_live_cells) {
      live_cells = {};
      for (var i in initial_live_cells) {
        live_cells[[initial_live_cells[i].x, initial_live_cells[i].y]] = true;
      }
    };

    /**
     * Find the neighboring cells around a given cell.
     * @param {Number} x - The x-coordinate of the cell whose neighbors we are finding.
     * @param {Number} y - The y-coordinate of the cell whose neighbors we are finding.
     * @return {Object} An Object which has two fields:
     *  neighbors {Array} -  An array where each element is an array containing two elements (the first element is the
     *             x-coordinate, the second element is the y-coordinate).
     *  num_live_neighbors {Number} - The number of live cells adjacent to the cell at x, y.
     */
    var neighbor_info = function(x, y) {
      var num_live_neighbors = 0;
      var neighbors = [];
      // Iterate through each adjacent cell.
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          // If the cell is alive, increment the number of live neighbor cells.
          if (live_cells[[x + i,y + j]] !== undefined) {
            num_live_neighbors++;
          }
          // Add the cell to the list of neighbors.
          neighbors.push([x + i, y + j]);
        }
      }
      return {
        "neighbors": neighbors,
        "num_live_neighbors": num_live_neighbors
      };
    };

    /**
     * Takes one step in the Game of Life.
     * @return {Array} Array which indicates the changes to the Game of Life after taking the step.
     *                 Each element of the array is an object (call it obj) where:
     *                     obj.state {String} = "Live" if the cell has just become alive due to this step.
     *                     obj.state {String} = "Dead" if the cell has just died due to this step.
     *                     obj.x {Number} = The x-coordinate of the cell.
     *                     obj.y {Number} = The y-coordinate of the cell.
     */
    var step = function() {
      var x;
      var y;
      var split_str;
      var updates = []
      var neighbors;
      var num_live_neighbors;
      var dead_neighbors = []
      var info_result;

      // Kill any live cells that need to die.
      for (var k in live_cells) {
        // Retreive the x and y coordinates of the live cell.
        split_str = k.split(",");
        x = parseInt(split_str[0]);
        y = parseInt(split_str[1]); 

        // Identify the neighbors.
        info_result = neighbor_info(x, y);
        neighbors = info_result.neighbors;
        num_live_neighbors = info_result.num_live_neighbors;

        // If the cell needs to die, add an update marking that the cell should die.
        if (num_live_neighbors < 2 || num_live_neighbors > 3) {
          updates.push({
            "state": "Dead",
            "x": x,
            "y": y
          });
        }

        // Iterate through each of the neighbors of this live cell.
        for (var i in neighbors) {
          x = neighbors[i][0];
          y = neighbors[i][1];
          
          // If the neighbor is dead, add it to the list of dead neighbors.
          if (live_cells[[x, y]] === undefined) {
            dead_neighbors[[x, y]] = true;
          }
        }
      }

      // Enliven any dead cells that need to live.
      for (var k in dead_neighbors) {
        // Retrieve the x and y coordinates of this dead cell.
        split_str = k.split(",");
        x = parseInt(split_str[0]);
        y = parseInt(split_str[1]); 

        // Determine the neighbors.
        info_result = neighbor_info(x, y);
        neighbors = info_result.neighbors;
        num_live_neighbors = info_result.num_live_neighbors;

        // If this cell should come alive, add an update to the list of updates.
        if (num_live_neighbors === 3) {
          updates.push({
            "state": "Live",
            "x": x,
            "y": y
          });
        }
      }

      // Apply the updates to the current game state.
      for (var i in updates) {
        if (updates[i].state === "Dead") {
          delete live_cells[[updates[i].x, updates[i].y]];
        } else {
          live_cells[[updates[i].x, updates[i].y]] = true;
        }
      }

      return updates;
    };

    /**
     * Adds the given cells as live cells.
     * @param {Array} live_cells - Array of objects indicating the live cells. 
     *                                For each obj in live_cells, (obj.x, obj.y) should be the location of a live cell. 
     */
    var add_live_cells = function(cells) {
      for (var i in cells) {
        live_cells[cells[i].x, cells[i].y] = true;
      }
    };

    var that = {};
    that.reset = reset;
    that.step = step;
    that.add_live_cells = add_live_cells;
    return that;
  };

  // Add to the global object.
  LIFE.Life = Life;
})();
