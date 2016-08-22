#!/usr/bin/env node

"use strict";

//imports
const http = require("http");
const app = require("../app").default;

//create HTTP server
const server = http.createServer(app);

//start app
server.listen(app.get("port"), app.get("host"));
server.on("error", onError);
server.on("listening", onListening);

//helpers
function onError(error) {
  var bind;

  if (error.syscall != "listen") throw error;

  bind = `${app.get("host")}:${app.get("port")}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case "EACCES":
    console.error(bind + " requires elevated privileges");
    process.exit(1);
    break;
  case "EADDRINUSE":
    console.error(bind + " is already in use");
    process.exit(1);
    break;
  default:
    throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  console.log(`Listening on ${app.get("host")}:${app.get("port")}`);
}
