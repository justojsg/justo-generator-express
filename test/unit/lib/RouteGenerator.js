//imports
const fs = require("justo-fs");
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;
const Generator = require("../../../dist/es5/nodejs/justo-generator-express")["route"];

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

    init("*", function() {
      DST_DIR = Dir.createTmpDir();
      DST = DST_DIR.path;
      gen = new Generator({mute: true, src: "dist/es5/nodejs/justo-generator-express/template", dst: DST}, {});
    }).title("Create tmp dir and generator");

    init("*", function() {
      fs.copy(SRC, DST);
    }).title("Prepare test environment");

    fin("*", function() {
      DST_DIR.remove();
    }).title("Delete tmp dir");

    test("generate(answers) - app/routes/user.js", function() {
      gen.generate({
        folder: "/",
        router: "user",
        path: "__edit__",
        method: "get",
        view: "user/Edit"
      });

      file(DST, "app/routes/user.js").must.exist();
      file(DST, "app/routes/user.js").must.contain(
        "router.get(\"/__edit__\", function(req, res) {\n" +
        "  const app = req.app;\n" +
        "  const params = req.params;\n" +
        "\n" +
        "  res.render(\"user/Edit\", {});\n" +
        "});"
      );
    });

    test("generate(answers) - app/routes/other/role.js", function() {
      gen.generate({
        folder: "other",
        router: "role",
        path: "__edit__",
        method: "get",
        view: "role/Edit"
      });

      dir(DST, "app/routes/other").must.exist();
      file(DST, "app/routes/other/role.js").must.exist();
      file(DST, "app/routes/other/role.js").must.contain(
        "router.get(\"/__edit__\", function(req, res) {\n" +
        "  const app = req.app;\n" +
        "  const params = req.params;\n" +
        "\n" +
        "  res.render(\"role/Edit\", {});\n" +
        "});"
      );
    });
  });
})();
