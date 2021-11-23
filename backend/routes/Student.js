const express = require("express");
const studentRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const db = require("../dbConnect");

studentRouter.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const profile = await db("student")
      .where({ id: req.user.id })
      .select("major", "username", "year");
    res.json(profile[0]);
  }
);

studentRouter.get(
  "/ratings",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const ratings = await db("student")
      .where({ id: req.user.id })
      .select("likes", "dislikes");
    res.json(ratings[0]);
  }
);

module.exports = studentRouter;
