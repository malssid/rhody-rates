const express = require("express");
const courseRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const db = require("../dbConnect");

courseRouter.get(
  "/likes",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const likes = await db("student")
      .where({ id: req.user.id })
      .select("likes");
    res.json(likes[0]);
  }
);

courseRouter.get(
  "/courses",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { page } = req.query;

    const courses = await db("course").orderBy('id').paginate({
      perPage: 10,
      currentPage: page,
    });
    res.json(courses);
  }
);

module.exports = courseRouter;
