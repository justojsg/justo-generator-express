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

//catalog
catalog.workflow({name: "build", desc: "Build the package"}, function() {
  clean("Remove build directory", {
    dirs: ["build/es5"]
  });

  lint("Best practices and grammar", {
    output: true,
    src: [
      "Justo.js",
      "bin/",
      "app/lib/",
      "app/routes/",
      "app/errors/handle.js",
      "app/index.js",
      "app/middleware.js",
      "app/redirect.js"
    ]
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    preset: "es2015",
    files: [
      {src: ["app/index.js", "app/middleware.js", "app/redirect.js", "app/tmplEngine.js"], dst: "build/es5/app/"},
      {src: "app/errors/handle.js", dst: "build/es5/app/errors/"},
      {src: "app/lib/", dst: "build/es5/app/lib/"},
      {src: "app/routes/", dst: "build/es5/app/routes"},
    ]
  });

  {{#if scope.nodemon}}
  // clean("Remove dist directory", {
  //   dirs: ["dist/es5"]
  // });
  {{else}}
  clean("Remove dist directory", {
    dirs: ["dist/es5"]
  });
  {{/if}}

  copy(
    "Create package",
    {
      src: [
        "package.json",
        "README.md",
        "bin/",
      ],
      dst: "dist/es5/nodejs/{{dir.name}}/"
    },
    {
      src: "build/es5/app/",
      dst: "dist/es5/nodejs/{{dir.name}}/"
    },
    {
      src: "app/conf/",
      dst: "dist/es5/nodejs/{{dir.name}}/app/"
    },
    {
      src: ["app/errors/404.html", "app/errors/500.html"],
      dst: "dist/es5/nodejs/{{dir.name}}/app/errors/"
    },
    {
      src: "app/public/",
      dst: "dist/es5/nodejs/{{dir.name}}/app/"
    },
    {
      src: "build/es5/lib/",
      dst: "dist/es5/nodejs/{{dir.name}}/lib",
      force: true
    },
    {
      src: "app/views",
      dst: "dist/es5/nodejs/{{dir.name}}/app/",
      force: true
    }
  );

  create("Create dir logs/", {dir: "dist/es5/nodejs/{{dir.name}}/logs/"});
});

catalog.macro({name: "test", desc: "Unit testing"}, {
  require: "justo-assert",
  src: ["test/unit/index.js", "test/unit/lib/"]
});

catalog.macro({name: "default", desc: "Default task."}, ["build", "test"]);
