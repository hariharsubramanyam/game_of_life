(function() {
  var canvas = document.getElementById("canvas");
  var canvas_grid = new LIFE.CanvasGrid(canvas);
  var life = new LIFE.Life();
  var initial_cells = [
    {x: 10, y: 10},
    {x: 11, y: 10},
    {x: 11, y: 12},
    {x: 13, y: 11},
    {x: 14, y: 10},
    {x: 15, y: 10},
    {x: 16, y: 10}
  ];
  for (var i in initial_cells) {
    var sq = initial_cells[i];
    canvas_grid.fillSquare(sq.x, sq.y);
  }
  life.reset(initial_cells);
  var updates;
  setInterval(function(){
    updates = life.step();
    console.log(updates);
    for (var i in updates) {
      if (updates[i].state === "Dead") {
        canvas_grid.clearSquare(updates[i].x, updates[i].y);
      } else {
        canvas_grid.fillSquare(updates[i].x, updates[i].y);
      }
    }
  }, 100);
})();
