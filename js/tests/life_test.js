// Test the Life class.
(function(life) {
  // Only run these tests if the flag indicates that tests should be run.
  if (LIFE.shouldRunTests) {
    
    QUnit.test("Testing that the neighbor_info of the Life class corrrectly determines the number of live neighbors.", function(assert) {
      // Create the life board with the given initial cells.
      var initial_cells = [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 2, y: 0},
        {x: 5, y: 10}
      ];
      life.reset(initial_cells);

      // Define the coordinates of the point under test.
      var x = 1;
      var y = 1;

      // Run the function.
      var neighbor_info = life.neighbor_info(x, y);
      var neighbors = neighbor_info.neighbors;
      var num_live_neighbors = neighbor_info.num_live_neighbors;

      // Ensure that the number of live neighbors is correct.
      assert.equal(num_live_neighbors, 3, "Incorrect number of live neighbors");
    });

    QUnit.test("Testing that the neighbor_info of the Life class corrrectly determines the neighbors.", function(assert) {
      // Create the life board with the given initial cells.
      var initial_cells = [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 2, y: 0},
        {x: 5, y: 10}
      ];
      life.reset(initial_cells);

      // Define the coordinates of the point under test.
      var x = 1;
      var y = 1;

      // Run the function.
      var neighbor_info = life.neighbor_info(x, y);
      var neighbors = neighbor_info.neighbors;
      
      // Iterate through all possible neighbors and computed neighbors and ensure that all the neighbors have been computed by the function.
      var num_correct_neighbors = 0;
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          for (var k in neighbors) {
            if (neighbors[k][0] === x + i && neighbors[k][1] === y + j) {
              num_correct_neighbors++;
            }
          }
        }
      }
      assert.equal(num_correct_neighbors, 8, "The neighbors have not been correctly identified");
    });

    QUnit.test("Testing that the step function in the Life class correctly computes the updates.", function(assert) {
      // Create the life board with the given initial cells.
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

      // Run the function.
      var step_results = life.step();

      // Define a helper function which checks if two states (like the objects produced by life.step() are equal).
      var state_matches = function(state_a, state_b) {
        return state_a.state === state_b.state 
                && state_a.x === state_b.x
                && state_a.y === state_b.y;
      };

      // Define the expected states.
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

      // Iterate through the expected results and actual results and ensure that the function produced the correct values.
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
