export function map(app) {
  app.use("/", require("./index").router);
  {{#if scope.react}}
  app.use("*", require("./react").router);
  {{/if}}
}
