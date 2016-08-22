//imports
const justo = require("justo");
const catalog = justo.catalog;
const babel = require("justo-plugin-babel");
const copy = require("justo-plugin-fs").copy;
const clean = require("justo-plugin-fs").clean;
const create = require("justo-plugin-fs").create;
{{#if (eq scope.linter "JSHint")}}
const lint = require("justo-plugin-jshint");
{{else if (eq scope.linter "ESLint")}}
const lint = require("justo-plugin-eslint");
{{/if}}
const publish = require("justo-plugin-npm").publish;
const install = require("justo-plugin-npm").install;

//catalog
catalog.workflow({name: "build", desc: "Build the package"}, function() {
  clean("Remove build directory", {
    dirs: ["build/es5"]
  });

  lint("Best practices and grammar", {
    output: true,
    src: [
      "app.js",
      "Justo.js",
      "bin/",
      "lib/",
      "routes/"
    ]
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    preset: "es2015",
    files: [
      {src: "app.js", dst: "build/es5/"},
      {src: "lib/", dst: "build/lib/"},
      {src: "routes/", dst: "build/es5/routes"},
    ]
  });

  // clean("Remove dist directory", {
  //   dirs: ["dist/es5"]
  // });

  copy(
    "Create package",
    {
      src: ["package.json", "README.md", "bin/", "config/", "public/", "views/"],
      dst: "dist/es5/nodejs/{{dir.name}}/"
    },
    {
      src: "build/es5/app.js",
      dst: "dist/es5/nodejs/{{dir.name}}/"
    },
    // {
    //   src: "build/es5/lib/",
    //   dst: "dist/es5/nodejs/{{dir.name}}/lib"
    // },
    {
      src: "build/es5/routes/",
      dst: "dist/es5/nodejs/{{dir.name}}/routes"
    }
  );

  create("Create dir logs/", {dir: "dist/es5/nodejs/{{dir.name}}/logs/"});
});

catalog.macro({name: "test", desc: "Unit testing"}, {
  require: "justo-assert",
  src: ["test/unit/index.js", "test/unit/lib/"]
});

catalog.macro({name: "default", desc: "Default task."}, ["build", "test"]);
