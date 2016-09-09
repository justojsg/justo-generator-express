//imports
import fs from "fs";
import path from "path";
{{#if scope.morgan}}
import morgan from "morgan";
{{/if}}

/**
 * Configure error handling.
 */
export function config(app) {
  {{#if scope.morgan}}
  app.use(function(err, req, res, next) {
    morgan(":date :url => " + err.toString(), {
      stream: fs.createWriteStream(path.join(__dirname, "../../logs/error.log"), {flags: "a"}),
    })(req, res, function() {
      next(err);
    });
  });
  {{/if}}

  {{#if (eq scope.notFound "Send public/index.html")}}
  app.use(function(req, res) {  //not found
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  {{else}}
  app.use(function(req, res, next) {  //not found
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
  {{/if}}

  if (app.get("env") === "development") {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render("error", {
        message: err.message,
        error: err
      });
    });
  } else {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render("error", {
        message: err.message,
        error: {}
      });
    });
  }
}
