(function() {
  var DOMGrid = function(parent_div, grid_size, dimension) {

    var toggle_on_click = false;

    // If there is no grid_size, set the default to 500.
    if (grid_size === undefined) {
      grid_size = 500;
    }

    // If there is no dimension, set the default to 30.
    if (dimension === undefined) {
      dimension = 25;
    }

    var square_size = Math.floor(grid_size / dimension);
    
    // Recompute the size of the canvas, given the size of the square.
    grid_size = square_size * dimension;
    
    // Create the div.
    $(parent_div).css("width", grid_size + "px")
                 .css("height", grid_size + "px")
                 .css("position", "absolute")
                 .css("top", "50px")
                 .css("left", 0)
                 .css("right", 0)
                 .css("margin", "auto");

    var grid = [];

    var clearGrid = function() {
      for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
          grid[i][j].css("background-color", "#ffffff");
        }
      }
    };

    var clearSquare = function(x, y) {
      if (isValidSquare(y, x)) {
        grid[y][x].css("background-color", "#ffffff");
        grid[y][x].life_data.is_alive = false;
      }
    };

    var fillSquare = function(x, y) {
      if (isValidSquare(y, x)) {
        grid[y][x].css("background-color", "#0f0");
        grid[y][x].life_data.is_alive = true;
      }
    }

    var enableToggleSquareOnClick = function() {
      toggle_on_click = true;
    };

    var disableToggleSquareOnClick = function() {
      toggle_on_click = false;
    };
    
    for (var i = 0; i < dimension; i++) {
      grid.push([]);
      for (var j = 0; j < dimension; j++) {
        var square = $("<span></span>");
        square.css("width", square_size + "px")
              .css("height", square_size + "px")
              .css("display", "inline-block")
              .css("position", "absolute")
              .css("border", "1px solid black")
              .css("left", j * square_size+ "px")
              .css("padding", "0px")
              .css("top", i * square_size + "px");
        (function(square, i, j) {
          square.life_data = {};
          square.life_data.is_alive = false;
          square.click(function() {
            if (toggle_on_click) {
              console.log(i + " and " + j + " is " + square.life_data.is_alive);
              if (square.life_data.is_alive) {
                clearSquare(j, i);
              } else {
                fillSquare(j, i);
              }
            }
          });
        })(square, i, j);
        grid[i].push(square);
        parent_div.append(square);
      }
    }

    /**
     * @param {Number} x - The x coordinate of a grid square.
     * @param {Number} y - The y coordinate of a grid square.
     * @return {Boolean} Whether the grid contains the square with coordinates (x, y).
     */
    var isValidSquare = function(x, y) {
      return x >= 0 && y >= 0 && x < dimension && y < dimension;
    };


    var that = {};
    that.clearGrid = clearGrid;
    that.clearSquare = clearSquare; 
    that.fillSquare = fillSquare;
    that.enableToggleSquareOnClick = enableToggleSquareOnClick;
    that.disableToggleSquareOnClick = disableToggleSquareOnClick;
    return that;
  };
  LIFE.DOMGrid = DOMGrid;
})();
