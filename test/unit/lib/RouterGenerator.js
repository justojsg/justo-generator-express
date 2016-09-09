//imports
const fs = require("justo-fs");
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;
const Generator = require("../../../dist/es5/nodejs/justo-generator-express")["router"];

//suite
suite("Generator", function() {
  const SRC = "test/unit/data";

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

    suite("folder", function() {
      init("*", function() {
        fs.copy(SRC, DST);
      }).title("Prepare environment");

      test("generate(answers) - folder is /", function() {
        gen.generate({
          folder: "/",
          name: "test",
          indexView: "my/View"
        });

        file(DST, "app/routes/test.js").must.exist();
        file(DST, "app/routes/map.js").must.contain("app.use(\"/test\", require(\"./test\").router);");
      });

      test("generate(answers) - folder is other", function() {
        gen.generate({
          folder: "other",
          name: "test",
          indexView: "my/View"
        });

        dir(DST, "app/routes/other").must.exist();
        file(DST, "app/routes/other/test.js").must.exist();
        file(DST, "app/routes/map.js").must.contain("app.use(\"/other/test\", require(\"./other/test\").router);");
      });
    });
  });
})();
