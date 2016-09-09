//imports
import path from "path";
import hbs from "hbs";

/**
 * Configure template engine.
 */
export function config(app) {
  app.set("views", path.join(__dirname, "./views"));
  app.set("view engine", "hbs");
  app.set("view cache", app.get("env") == "production");
  app.engine("hbs", hbs.__express);
  hbs.registerPartials(path.join(__dirname, "./views/partials/"));
  app.locals.appName = app.get("config").appName;
}
