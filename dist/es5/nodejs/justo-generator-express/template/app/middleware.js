//imports
import fs from "fs";
import path from "path";
{{#if scope.morgan}}
import morgan from "morgan";
{{/if}}

/**
 * Configure middleware stack.
 */
export function config(app) {
  {{#if scope.helmet}}
  app.use(require("helmet")());
  {{/if}}
  {{#if (eq scope.session "cookie-session")}}
  app.use(require("cookie-session")({
    name: "sinfo",
    keys: ["{{scope.sessionSecret}}", "{{scope.sessionSecret}}"],
    maxAge: {{scope.sessionMaxAge}}
  }));
  {{/if}}
  {{#if (eq scope.session "express-session")}}
  app.use(require("express-session")({
    name: "sinfo",
    cookie: {maxAge: "{{scope.sessionMaxAge}}"},
    secret: "{{scope.sessionSecret}}"{{#if scope.sessionGenid}},
    resave: false,
    saveUninitialized: false,
    genid: function(req) { return Date.now().toString(); }{{/if}}
  }));
  {{/if}}
  {{#if scope.morgan}}
  app.use(morgan(
    "{{{scope.morganFormat}}}",
    {
      stream: fs.createWriteStream(path.join(__dirname, "../logs/access.log"), {flags: "a"})
    }
  ));
  {{/if}}
  {{#if scope.favicon}}
  app.use(require("serve-favicon")(path.join(__dirname, "public", "{{{scope.faviconFile}}}"), {
    maxAge: {{scope.faviconMaxAge}}
  }));
  {{/if}}
  {{#if scope.serveStatic}}
  app.use(require("serve-static")(path.join(__dirname, "public"), {
    maxAge: {{scope.serveStaticMaxAge}}
  }));
  {{/if}}
  {{#if scope.cookieParser}}
  app.use(require("cookie-parser")("{{scope.cookieParserSecret}}"));
  {{/if}}
  {{#if (contain scope.bodyParser "json")}}
  app.use(require("body-parser").json({type: "application/json"}));
  {{/if}}
  {{#if (contain scope.bodyParser "urlencoded")}}
  app.use(require("body-parser").urlencoded({
    type: "application/x-www-form-urlencoded",
    extended: false
  }));
  {{/if}}
  {{#if (contain scope.bodyParser "text")}}
  app.use(require("body-parser").text({
    type: "text/plain"
  }));
  {{/if}}
  {{#if (contain scope.bodyParser "raw")}}
  app.use(require("body-parser").raw({
    type: "application/octet-stream"
  }));
  {{/if}}
}
