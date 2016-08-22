"use strict";module.exports = {
  "default": require("./lib/Generator.js").default,
  "hbs view": require("./lib/HbsViewGenerator").default,
  "hbs partial": require("./lib/HbsPartialGenerator").default,
  "router": require("./lib/RouterGenerator").default,
  "route": require("./lib/RouteGenerator").default };