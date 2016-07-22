//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const pkg = require("../../dist/es5/nodejs/justo-generator-express");

//suite
suite("index", function() {
  test("default", function() {
    pkg["default"].must.be.instanceOf(Function);
  });

  test("hbs partial", function() {
    pkg["hbs partial"].must.be.instanceOf(Function);
  });

  test("hbs view", function() {
    pkg["hbs view"].must.be.instanceOf(Function);
  });

  test("router", function() {
    pkg["router"].must.be.instanceOf(Function);
  });

  test("route", function() {
    pkg["route"].must.be.instanceOf(Function);
  });
})();
