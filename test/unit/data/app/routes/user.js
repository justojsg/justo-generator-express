//imports
import express from "express";

//router
export const router = express.Router();

//routes
router.get("/", function(req, res) {
  const app = req.app;
  res.render("user/Index", {});
});

router.get("/__new__", function(req, res) {
  const app = req.app;
  const params = req.params;

  res.render("user/New", {});
});
