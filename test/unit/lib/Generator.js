//imports
// const path = require("path");
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;
const Generator = require("../../../dist/es5/nodejs/justo-generator-express").default;

//suite
suite.only("Generator", function() {
  suite("#constructor()", function() {
    test("constructor()", function() {
      var gen = new Generator({});
      gen.must.be.instanceOf(Generator);
    });
  });

  suite("#generate()", function() {
    var gen, DST_DIR, DST;

    function common() {
      dir(DST, "app").must.exist();
      dir(DST, "app/conf").must.exist();
      file(DST, "app/conf/development.json").must.exist();
      file(DST, "app/conf/production.json").must.exist();
      dir(DST, "app/errors").must.exist();
      file(DST, "app/errors/404.html").must.exist();
      file(DST, "app/errors/500.html").must.exist();
      file(DST, "app/errors/handle.js").must.exist();
      dir(DST, "app/public").must.exist();
      dir(DST, "app/public/images").must.exist();
      dir(DST, "app/public/stylesheets").must.exist();
      file(DST, "app/public/stylesheets/style.css").must.exist();
      file(DST, "app/public/robots.txt").must.exist();
      dir(DST, "app/routes").must.exist();
      file(DST, "app/routes/index.js").must.exist();
      file(DST, "app/routes/map.js").must.exist();
      file(DST, "app/routes/route.hbs").must.not.exist();
      file(DST, "app/routes/router.js").must.not.exist();
      file(DST, "app/index.js").must.exist();
      file(DST, "app/middleware.js").must.exist();
      file(DST, "app/redirect.js").must.exist();

      dir(DST, "bin").must.exist();
      file(DST, "bin/www.js").must.exist();
      dir(DST, "dist").must.exist();
      file(DST, ".editorconfig").must.exist();
      file(DST, ".gitignore").must.exist();
      file(DST, "package.json").must.exist();
      file(DST, ".travis.yml").must.exist();
      file(DST, "Justo.js").must.exist();
      file(DST, "README.md").must.exist();
    }

    init("*", function() {
      DST_DIR = Dir.createTmpDir();
      DST = DST_DIR.path;
      gen = new Generator({mute: true, src: "dist/es5/nodejs/justo-generator-express/template", dst: DST}, {});
    }).title("Create tmp dir and generator");

    fin("*", function() {
      DST_DIR.remove();
    }).title("Delete tmp dir");

    suite("Handlebars", function() {
      test("true", function() {
        gen.generate({
          appName: "test",
          binName: "test",
          bodyParser: ["json", "text", "raw", "urlencoded"],
          cookieParser: true,
          cookieParserSecret: "1234",
          favicon: true,
          faviconFile: "/images/favicon.png",
          faviconMaxAge: 1234,
          gitignore: true,
          hbs: true,
          helmet: true,
          linter: "ESLint",
          morgan: true,
          morganFormat: "shared",
          nodemon: true,
          notFound: "Send 404",
          serveStatic: true,
          serveStaticMaxAge: 1234,
          session: "express-session",
          sessionMaxAge: 1234,
          sessionSecret: "1234",
          sessionGenid: true
        });

        common();
        file(DST, "package.json").must.contain("\"hbs\": \"*\"");
        file(DST, "app/tmplEngine.js").must.exist();
        dir(DST, "app/views").must.exist();
        dir(DST, "app/views/partials").must.exist();
        file(DST, "app/views/error.hbs").must.exist();
        file(DST, "app/views/index.hbs").must.exist();
        file(DST, "app/views/layout.hbs").must.exist();
        file(DST, "app/views/view.hbs").must.not.exist();
      });

      test("false", function() {
        gen.generate({
          appName: "test",
          binName: "test",
          bodyParser: ["json", "text", "raw", "urlencoded"],
          cookieParser: true,
          cookieParserSecret: "1234",
          favicon: true,
          faviconFile: "/images/favicon.png",
          faviconMaxAge: 1234,
          gitignore: true,
          hbs: false,
          helmet: true,
          linter: "ESLint",
          morgan: true,
          morganFormat: "shared",
          nodemon: true,
          notFound: "Send 404",
          serveStatic: true,
          serveStaticMaxAge: 1234,
          session: "express-session",
          sessionMaxAge: 1234,
          sessionSecret: "1234",
          sessionGenid: true
        });

        common();
        file(DST, "package.json").must.not.contain("\"hbs\": \"*\"");
        file(DST, "app/tmplEngine.js").must.not.exist();
        dir(DST, "app/views").must.not.exist();
      });
    });

    suite("Linter", function() {
      test("ESLint", function() {
        gen.generate({
          appName: "test",
          binName: "test",
          bodyParser: ["json", "text", "raw", "urlencoded"],
          cookieParser: true,
          cookieParserSecret: "1234",
          favicon: true,
          faviconFile: "/images/favicon.png",
          faviconMaxAge: 1234,
          gitignore: true,
          helmet: true,
          linter: "ESLint",
          morgan: true,
          morganFormat: "shared",
          nodemon: true,
          notFound: "Send 404",
          serveStatic: true,
          serveStaticMaxAge: 1234,
          session: "express-session",
          sessionMaxAge: 1234,
          sessionSecret: "1234",
          sessionGenid: true
        });

        common();
        file(DST, ".eslintignore").must.exist();
        file(DST, ".eslintrc").must.exist();
        file(DST, ".jshintrc").must.not.exist();
      });

      test("JSHint", function() {
        gen.generate({
          appName: "test",
          binName: "test",
          bodyParser: ["json", "text", "raw", "urlencoded"],
          cookieParser: true,
          cookieParserSecret: "1234",
          favicon: true,
          faviconFile: "/images/favicon.png",
          faviconMaxAge: 1234,
          gitignore: true,
          helmet: true,
          linter: "JSHint",
          morgan: true,
          morganFormat: "shared",
          nodemon: true,
          notFound: "Send 404",
          serveStatic: true,
          serveStaticMaxAge: 1234,
          session: "express-session",
          sessionMaxAge: 1234,
          sessionSecret: "1234",
          sessionGenid: true
        });

        common();
        file(DST, ".eslintignore").must.not.exist();
        file(DST, ".eslintrc").must.not.exist();
        file(DST, ".jshintrc").must.exist();
      });
    });

    suite("Session state", function() {
      test("<none>", function() {
        gen.generate({
          appName: "test",
          binName: "test",
          bodyParser: ["json", "text", "raw", "urlencoded"],
          cookieParser: true,
          cookieParserSecret: "1234",
          favicon: true,
          faviconFile: "/images/favicon.png",
          faviconMaxAge: 1234,
          gitignore: true,
          helmet: true,
          linter: "JSHint",
          morgan: true,
          morganFormat: "shared",
          nodemon: true,
          notFound: "Send 404",
          serveStatic: true,
          serveStaticMaxAge: 1234,
          session: "<none>"
        });

        common();
        file(DST, "package.json").must.not.contain(["cookie-session", "express-session"]);
        file(DST, "app/middleware.js").must.not.contain(["cookie-session", "express-session"]);
      });

      test("cookie-session", function() {
        gen.generate({
          appName: "test",
          binName: "test",
          bodyParser: ["json", "text", "raw", "urlencoded"],
          cookieParser: true,
          cookieParserSecret: "1234",
          favicon: true,
          faviconFile: "/images/favicon.png",
          faviconMaxAge: 1234,
          gitignore: true,
          helmet: true,
          linter: "JSHint",
          morgan: true,
          morganFormat: "shared",
          nodemon: true,
          notFound: "Send 404",
          serveStatic: true,
          serveStaticMaxAge: 1234,
          session: "cookie-session",
          sessionMaxAge: 1234,
          sessionSecret: "1234"
        });

        common();
        file(DST, "package.json").must.contain("cookie-session");
        file(DST, "package.json").must.not.contain("express-session");
        file(DST, "app/middleware.js").must.contain("cookie-session");
        file(DST, "app/middleware.js").must.not.contain("express-session");
      });

      test("express-session", function() {
        gen.generate({
          appName: "test",
          binName: "test",
          bodyParser: ["json", "text", "raw", "urlencoded"],
          cookieParser: true,
          cookieParserSecret: "1234",
          favicon: true,
          faviconFile: "/images/favicon.png",
          faviconMaxAge: 1234,
          gitignore: true,
          helmet: true,
          linter: "JSHint",
          morgan: true,
          morganFormat: "shared",
          nodemon: true,
          notFound: "Send 404",
          serveStatic: true,
          serveStaticMaxAge: 1234,
          session: "express-session",
          sessionMaxAge: 1234,
          sessionSecret: "1234",
          sessionGenid: true
        });

        common();
        file(DST, "package.json").must.contain("express-session");
        file(DST, "package.json").must.not.contain("cookie-session");
        file(DST, "app/middleware.js").must.contain("express-session");
        file(DST, "app/middleware.js").must.not.contain("cookie-session");
      });
    });
  });
})();
