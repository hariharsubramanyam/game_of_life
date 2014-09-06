(function(life) {
  if (LIFE.shouldRunTests) {
    QUnit.test("Testing Life class.", function(assert) {
      var initial_cells = [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 1, y: 2},
        {x: 3, y: 1},
        {x: 4, y: 0},
        {x: 5, y: 0},
        {x: 6, y: 0}
      ];
      life.reset(initial_cells);
      var step_results = life.step();
      var state_matches = function(state_a, state_b) {
        return state_a.state === state_b.state 
                && state_a.x === state_b.x
                && state_a.y === state_b.y;
      };
      var expected_results = [
        {state: "Dead", x: 0, y: 0},
        {state: "Dead", x: 1, y: 0},
        {state: "Dead", x: 1, y: 2},
        {state: "Dead", x: 3, y: 1},
        {state: "Dead", x: 6, y: 0},
        {state: "Live", x: 0, y: 1},
        {state: "Live", x: 1, y: 1},
        {state: "Live", x: 2, y: 1},
        {state: "Live", x: 4, y: 1},
        {state: "Live", x: 5, y: -1},
        {state: "Live", x: 5, y: 1}
      ];
      var num_matches = 0;
      for (var i in step_results) {
        for (var j in expected_results) {
          if (state_matches(step_results[i], expected_results[j])) {
            num_matches++;
          }
        }
      }
      assert.equal(num_matches, expected_results.length,  "First step did not yield the correct results");
    });
  }
})(new LIFE.Life());
