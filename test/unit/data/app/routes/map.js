export function map(app) {
  app.use("/", require("./index").router);
}
