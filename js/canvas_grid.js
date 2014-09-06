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
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    // If there is no canvas_size, set the default to 500.
    if (canvas_size === undefined) {
      this.canvas_size = 500;
    } else {
      this.canvas_size = canvas_size;
    }

    // If there is no dimension, set the default to 30.
    if (dimension === undefined) {
      this.dimension = 30;
    } else {
      this.dimension = dimension;
    }

    // Determine the size of a square.
    this.square_size = Math.floor(this.canvas_size / this.dimension);
    
    // Recompute the size of the canvas, given the size of the square.
    this.canvas_size = this.square_size * this.dimension;

    // Set the size of the canvas.
    this.canvas.setAttribute("height", this.canvas_size);
    this.canvas.setAttribute("width", this.canvas_size);

    // Draw a border around the canvas.
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, this.canvas_size);
    this.ctx.lineTo(this.canvas_size, this.canvas_size);
    this.ctx.lineTo(this.canvas_size, 0);
    this.ctx.lineTo(0, 0);

    // Draw the gridlines.
    for (var i = 0; i < this.dimension; i++) {
      this.ctx.moveTo(0, this.square_size * i);
      this.ctx.lineTo(this.canvas_size, this.square_size * i);
      this.ctx.moveTo(this.square_size * i, 0);
      this.ctx.lineTo(this.square_size * i, this.canvas_size);
    }

    // Set the color and perform the actual drawing.
    this.ctx.strokeStyle = "#000";
    this.ctx.stroke();
  };

  /**
   * @param {Number} x - The x coordinate of a grid square.
   * @param {Number} y - The y coordinate of a grid square.
   * @return {Boolean} Whether the grid contains the square with coordinates (x, y).
   */
  CanvasGrid.prototype.isValidSquare = function(x, y) {
    return x >= 0 && y >= 0 && x < this.dimension && y < this.dimension;
  };

  /**
   * Fill a square at (x, y).
   * @param {Number} x - The x coordinate of a grid square.
   * @param {Number} y - The y coordinate of a grid square.
   */
  CanvasGrid.prototype.fillSquare = function(x, y) {
    var old_fill_style = this.ctx.fillStyle;
    this.ctx.fillStyle = "#0f0";
    if (!this.isValidSquare(x, y)) {
      return;
    }

    this.ctx.fillRect(x * this.square_size + 1, y * this.square_size + 1, this.square_size - 2, this.square_size - 2);
    this.ctx.fillStyle = old_fill_style;
  };

  /**
   * Fill a square at (x, y).
   * @param {Number} x - The x coordinate of a grid square.
   * @param {Number} y - The y coordinate of a grid square.
   */
  CanvasGrid.prototype.clearSquare = function(x, y) {
    var old_fill_style = this.ctx.fillStyle;
    this.ctx.fillStyle = "#fff";
    if (!this.isValidSquare(x, y)) {
      return;
    }

    this.ctx.fillRect(x * this.square_size + 1, y * this.square_size + 1, this.square_size - 2, this.square_size - 2);
    this.ctx.fillStyle = old_fill_style;
  };

  LIFE.CanvasGrid = CanvasGrid;
})();
