(function(){
  /**
   * Draws a grid on top of an HTML5 canvas and makes it possible to 
   * fill in grid squares and clear them.
   * @constructor
   * @param {Object} canvas - This must be a canvas element on the page.
   * @param {Number} canvas_size - This is the size of the canvas which will desire
   *                               to be the width and height. We will get close to
   *                               it, but may not be exact because we must ensure
   *                               that the grid is a square and can contain the desired
   *                               number of grid squares. If this value is not provided,
   *                               the default is 500, so the canvas should be close to 
   *                               500 x 500.
   * @param {Number} dimension - The canvas will be dimension x dimension squares in the grid.
   *                             If this value is not provided, the default is 30, so we will
   *                             have a 30 x 30 = 900 squares in the grid.
   */
  var CanvasGrid = function(canvas, canvas_size, dimension) {

    var ctx = canvas.getContext("2d");

    // If there is no canvas_size, set the default to 500.
    if (canvas_size === undefined) {
      canvas_size = 500;
    }

    // If there is no dimension, set the default to 30.
    if (dimension === undefined) {
      dimension = 30;
    }

    // Determine the size of a square.
    var square_size = Math.floor(canvas_size / dimension);
    
    // Recompute the size of the canvas, given the size of the square.
    canvas_size = square_size * dimension;

    // Set the size of the canvas.
    canvas.setAttribute("height", canvas_size);
    canvas.setAttribute("width", canvas_size);

    /**
     * Clears the grid and redraws the gridlines
     */
    var clearGrid = function() {
      ctx.clearRect(0, 0, canvas_size, canvas_size);

      // Draw a border around the canvas.
      ctx.moveTo(0, 0);
      ctx.lineTo(0, canvas_size);
      ctx.lineTo(canvas_size, canvas_size);
      ctx.lineTo(canvas_size, 0);
      ctx.lineTo(0, 0);

      // Draw the gridlines.
      for (var i = 0; i < dimension; i++) {
        ctx.moveTo(0, square_size * i);
        ctx.lineTo(canvas_size, square_size * i);
        ctx.moveTo(square_size * i, 0);
        ctx.lineTo(square_size * i, canvas_size);
      }

      // Set the color and perform the actual drawing.
      ctx.strokeStyle = "#000";
      ctx.stroke();
    };

    /**
     * @param {Number} x - The x coordinate of a grid square.
     * @param {Number} y - The y coordinate of a grid square.
     * @return {Boolean} Whether the grid contains the square with coordinates (x, y).
     */
    var isValidSquare = function(x, y) {
      return x >= 0 && y >= 0 && x < dimension && y < dimension;
    };

    /**
     * Fill a square at (x, y).
     * @param {Number} x - The x coordinate of a grid square.
     * @param {Number} y - The y coordinate of a grid square.
     */
    var fillSquare = function(x, y, color) {   
      // We want y to increase from bottom to top.
      y = dimension - y;
      
      // Ensure that the square is valid.
      if (!isValidSquare(x, y)) {
        return;
      }

      // Remember the old fill style and set a new one.
      var old_fill_style = ctx.fillStyle;
      if (color === undefined) {
        ctx.fillStyle = "#0f0";
      } else {
        ctx.fillStyle = color;
      }
      
      // Fill the square (we make it have side length = square_size - 1 so that it does not cover the gridlines).
      ctx.fillRect(x * square_size + 1, y * square_size + 1, square_size - 2, square_size - 2);

      // Restore the original fill style.
      ctx.fillStyle = old_fill_style;
    };

    /**
     * Clear a square at (x, y).
     * @param {Number} x - The x coordinate of a grid square.
     * @param {Number} y - The y coordinate of a grid square.
     */
    var clearSquare = function(x, y) {
      fillSquare(x, y, "#fff");
    };

    // Create an object and assign the functions to it.
    var that = {};
    that.clearGrid = clearGrid;
    that.isValidSquare = isValidSquare;
    that.fillSquare = fillSquare;
    that.clearSquare = clearSquare;
    
    that.clearGrid();

    return that;
  };

  LIFE.CanvasGrid = CanvasGrid;
})();
