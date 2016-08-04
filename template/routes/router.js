//imports
import express from "express";

//router
export const router = express.Router();

//routes
router.get("/", function(req, res) {
  const app = req.app;
  {{#if scope.indexView}}
  res.render("{{scope.indexView}}", {});
  {{else}}
  
  //res.send(...);
  //res.json(...);
  //res.sendFile(...);
  {{/if}}
});
