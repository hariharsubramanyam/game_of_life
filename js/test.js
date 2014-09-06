(function() {
  /*
   * Whether the tests should be run.
   * When creating a new test, make sure to check if this field is set true.
   * Only run tests if the field is set to true.
   */
  LIFE.shouldRunTests = false;

  /*
   * If the tests should not be run, remove the qunit and qunit-fixture UI elements which report
   * the results of testing.
   */
  if (!LIFE.shouldRunTests) {
    var qunit = document.getElementById("qunit");
    var qunit_fixture = document.getElementById("qunit-fixture");
    if (qunit !== undefined) {
      qunit.remove();
    }
    if (qunit_fixture !== undefined) {
      qunit_fixture.remove();
    }
  }

})();
