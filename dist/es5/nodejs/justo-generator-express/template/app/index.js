//imports
import express from "express";

//app
const app = express();
export default app;

//config
app.set("env", process.env.NODE_ENV || "development");
app.set("config", require(`./conf/${app.get("env")}`));
app.set("host", process.env.HOST || app.get("config").host);
app.set("port", process.env.PORT || app.get("config").port);
{{#unless scope.helmet}}
app.disable("x-powered-by");
{{/unless}}

{{#if scope.hbs}}
require("./tmplEngine").config(app);
{{/if}}
require("./middleware").config(app);
require("./redirect").config(app);
require("./routes/map").map(app);
require("./errors/handle").config(app);
