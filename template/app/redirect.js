export function config(app) {
  {{#if (in scope.faviconFile "/images/favicon.png" "/images/favicon.ico")}}
  app.get("/favicon.ico", function(req, res) {
    res.redirect("{{scope.faviconFile}}");
  });
  {{/if}}
}
