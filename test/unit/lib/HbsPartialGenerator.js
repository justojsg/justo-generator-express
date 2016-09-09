//imports
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;
const Generator = require("../../../dist/es5/nodejs/justo-generator-express")["hbs partial"];

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

    suite("Folder", function() {
      test("folder is /", function() {
        gen.generate({
          folder: "/",
          name: "test"
        });

        file(DST, "app/views/partials/test.hbs").must.exist();
        file(DST, "app/views/partials/test.hbs").must.contain("{{!-- partial content --}}");
      });

      test("folder is other", function() {
        gen.generate({
          folder: "other",
          name: "test"
        });

        dir(DST, "app/views/partials/other").must.exist();
        file(DST, "app/views/partials/other/test.hbs").must.exist();
        file(DST, "app/views/partials/other/test.hbs").must.contain("{{!-- partial content --}}");
      });
    });
  });
})();
