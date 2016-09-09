//imports
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;
const Generator = require("../../../dist/es5/nodejs/justo-generator-express")["hbs view"];

//suite
suite("Generator", function() {
  suite("#constructor()", function() {
    test("constructor()", function() {
      var gen = new Generator({});
      gen.must.be.instanceOf(Generator);
    });
  });

  suite("#generate()", function() {
    var gen, DST_DIR, DST;

    init({name: "*", title: "Create tmp dir and generator"}, function() {
      DST_DIR = Dir.createTmpDir();
      DST = DST_DIR.path;
      gen = new Generator({mute: true, src: "dist/es5/nodejs/justo-generator-express/template", dst: DST}, {});
    });

    fin({name: "*", title: "Delete tmp dir"}, function() {
      DST_DIR.remove();
    });

    test("generate(answers) - into app/views", function() {
      gen.generate({
        folder: "/",
        view: "Test",
        form: false
      });

      file(DST, "app/views/Test.hbs").must.exist();
    });

    test("generate(answers) - into app/views/folder", function() {
      gen.generate({
        folder: "/mytest",
        view: "Test",
        form: false
      });

      dir(DST, "app/views/mytest").must.exist();
      file(DST, "app/views/mytest/Test.hbs").must.exist();
    });

    suite("Form?", function() {
      test("generate(answers) - generate form", function() {
        gen.generate({
          folder: "/",
          view: "Test",
          form: true
        });

        file(DST, "app/views/Test.hbs").must.exist();
        file(DST, "app/views/Test.hbs").must.contain("<form");
      });

      test("generate(answers) - not generate form", function() {
        gen.generate({
          folder: "/",
          view: "Test",
          form: false
        });

        file(DST, "app/views/Test.hbs").must.exist();
        file(DST, "app/views/Test.hbs").must.not.contain("<form");
      });
    });
  });
})();
