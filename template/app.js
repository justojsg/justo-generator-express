//imports
import path from "path";
import express from "express";
import hbs from "hbs";
import fs from "fs";
{{#if scope.morgan}}
import morgan from "morgan";
{{/if}}

//app
const app = express();
export default app;

//config
app.set("env", process.env.NODE_ENV || "development");
app.set("config", require(`./config/${app.get("env")}`));
app.set("host", process.env.HOST || app.get("config").host);
app.set("port", process.env.PORT || app.get("config").port);
{{#unless scope.helmet}}
app.disable("x-powered-by");
{{/unless}}

//config (template engine)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.set("view cache", app.get("env") == "production");
app.engine("hbs", hbs.__express);
hbs.registerPartials(path.join(__dirname, "views/partials/"));
app.locals.appName = app.get("config").appName;

//middleware
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
    stream: fs.createWriteStream(path.join(__dirname, "logs/access.log"), {flags: "a"})
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

//redirections
{{#if (in scope.faviconFile "/images/favicon.png" "/images/favicon.ico")}}
app.get("/favicon.ico", function(req, res) {
  res.redirect("{{scope.faviconFile}}");
});
{{/if}}

//route map
require("./routes/map").map(app);

//handle errors
{{#if scope.morgan}}
app.use(function(err, req, res, next) {
  morgan(":date :url => " + err.toString(), {
    stream: fs.createWriteStream(path.join(__dirname, "logs/error.log"), {flags: "a"}),
  })(req, res, function() {
    next(err);
  });
});
{{/if}}

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

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
