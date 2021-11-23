const express = require("express");
const courseRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const db = require("../dbConnect");

courseRouter.get(
  "/courses",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { page, keyword } = req.query;

    const courses = await db("course")
      .whereRaw("subject ILIKE ?", [`%${keyword}%`])
      .orWhereRaw("long_title ILIKE ?", [`%${keyword}%`])
      .orderBy("id")
      .paginate({
        perPage: 10,
        currentPage: page,
        isLengthAware: true,
      });

    res.json(courses);
  }
);

module.exports = courseRouter;
