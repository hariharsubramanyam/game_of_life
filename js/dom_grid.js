(function() {
  var DOMGrid = function(parent_div, grid_size, dimension) {
    // If there is no grid_size, set the default to 500.
    if (grid_size === undefined) {
      grid_size == 500;
    }

    // If there is no dimension, set the default to 30.
    if (dimension === undefined) {
      dimension = 30;
    }

    $(parent_div).css("width", grid_size + "px")
                 .css("height", grid_size + "px")
                 .css("background-color", "red");

    var that = {};
    that.clearGrid = function(){
    };
    that.clearSquare = function() {
    };
    that.fillSquare = function() {
    };
    return that;
  };
  LIFE.DOMGrid = DOMGrid;
})();
