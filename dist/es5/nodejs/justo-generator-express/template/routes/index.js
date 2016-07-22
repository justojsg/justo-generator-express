//imports
import express from "express";

//router
export const router = express.Router();

//routes
router.get("/", function(req, res) {
  res.render("index", {title: "My app", datetime: new Date()});
});
