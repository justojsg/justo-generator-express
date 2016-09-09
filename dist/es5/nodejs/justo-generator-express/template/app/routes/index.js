//imports
import express from "express";

//router
export const router = express.Router();

//routes
router.get("/", function(req, res) {
  {{#if scope.hbs}}
  res.render("index", {title: "My app", datetime: new Date()});
  {{else}}
  res.send("Hello world!");
  {{/if}}
});
