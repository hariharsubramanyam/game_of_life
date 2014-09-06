(function(){
  var CanvasGrid = function(canvas, canvas_size, dimension) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    if (canvas_size === undefined) {
      this.canvas_size = 500;
    } else {
      this.canvas_size = canvas_size;
    }

    if (dimension === undefined) {
      this.dimension = 30;
    } else {
      this.dimension = dimension;
    }

    this.square_size = Math.floor(this.canvas_size / this.dimension);
    this.canvas_size = this.square_size * this.dimension;
    this.canvas.setAttribute("height", this.canvas_size);
    this.canvas.setAttribute("width", this.square_size * this.dimension);

    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, this.canvas_size);
    this.ctx.lineTo(this.canvas_size, this.canvas_size);
    this.ctx.lineTo(this.canvas_size, 0);
    this.ctx.lineTo(0, 0);

    for (var i = 0; i < this.dimension; i++) {
      this.ctx.moveTo(0, this.square_size * i);
      this.ctx.lineTo(this.canvas_size, this.square_size * i);
      this.ctx.moveTo(this.square_size * i, 0);
      this.ctx.lineTo(this.square_size * i, this.canvas_size);
    }

    this.ctx.strokeStyle = "#000";
    this.ctx.stroke();
  };

  CanvasGrid.prototype.isValidSquare = function(x, y) {
    return x >= 0 && y >= 0 && x < this.dimension && y < this.dimension;
  };

  CanvasGrid.prototype.fillSquare = function(x, y) {
    var old_fill_style = this.ctx.fillStyle;
    this.ctx.fillStyle = "#0f0";
    if (!this.isValidSquare(x, y)) {
      return;
    }

    this.ctx.fillRect(x * this.square_size + 1, y * this.square_size + 1, this.square_size - 2, this.square_size - 2);
    this.ctx.fillStyle = old_fill_style;
  };

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
