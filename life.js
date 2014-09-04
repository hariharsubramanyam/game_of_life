(function() {
/**
 * Game logic for the Game of Life.
 * @constructor
 */
var Life = function(){ 
};

/**
 * Clears the entire game board and sets the given cells as live cells.
 * @param {Array} live_cells - Array of objects indicating the live cells. 
 *                                For each obj in live_cells, (obj.x, obj.y) should be the location of a live cell. 
 */
Life.prototype.reset = function(live_cells) {
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
};

// Add to the global object.
LIFE.Life = Life;
})();
