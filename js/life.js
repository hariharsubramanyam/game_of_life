(function() {
/**
 * Game logic for the Game of Life.
 * @constructor
 */
var Life = function(){ 
  this.isLiveForCell = {};
};

/**
 * Clears the entire game board and sets the given cells as live cells.
 * @param {Array} live_cells - Array of objects indicating the live cells. 
 *                                For each obj in live_cells, (obj.x, obj.y) should be the location of a live cell. 
 */
Life.prototype.reset = function(live_cells) {
  this.isLiveForCell = {};
  for (var i in live_cells) {
    this.isLiveForCell[[live_cells[i].x, live_cells[i].y]] = true;
  }
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
Life.prototype.step = function() {
  var that = this;
  var neighbor_info = function(x, y) {
    var num_live_neighbors = 0;
    var neighbors = [];
    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        if (that.isLiveForCell[[x + i,y + j]] !== undefined) {
          num_live_neighbors++;
        }
        neighbors.push([x + i, y + j]);
      }
    }
    return {
      "neighbors": neighbors,
      "num_live_neighbors": num_live_neighbors
    };
  };
  var x;
  var y;
  var split_str;
  var updates = []
  var neighbors;
  var num_live_neighbors;
  var dead_neighbors = []
  var info_result;
  // Kill any live cells that need to die.
  for (var k in this.isLiveForCell) {
    split_str = k.split(",");
    x = parseInt(split_str[0]);
    y = parseInt(split_str[1]); 
    info_result = neighbor_info(x, y);
    neighbors = info_result.neighbors;
    num_live_neighbors = info_result.num_live_neighbors;
    if (num_live_neighbors < 2 || num_live_neighbors > 3) {
      updates.push({
        "state": "Dead",
        "x": x,
        "y": y
      });
    }
    for (var i in neighbors) {
      x = neighbors[i][0];
      y = neighbors[i][1];
      if (this.isLiveForCell[[x, y]] === undefined) {
        dead_neighbors[[x, y]] = true;
      }
    }
  }
  // Enliven any dead cells that need to live.
  for (var k in dead_neighbors) {
    split_str = k.split(",");
    x = parseInt(split_str[0]);
    y = parseInt(split_str[1]); 
    info_result = neighbor_info(x, y);
    neighbors = info_result.neighbors;
    num_live_neighbors = info_result.num_live_neighbors;
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
      delete this.isLiveForCell[[updates[i].x, updates[i].y]];
    } else {
      this.isLiveForCell[[updates[i].x, updates[i].y]] = true;
    }
  }
  console.log(this.isLiveForCell);
  return updates;
};


// Add to the global object.
LIFE.Life = Life;
})();
