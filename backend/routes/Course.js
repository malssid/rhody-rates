const express = require("express");
const courseRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const db = require("../dbConnect");

courseRouter.get(
  "/courses",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { page, keyword, sort } = req.query;
    const trimmedKeyword = keyword.trim();

    if (sort != "") {
      const courses = await db("course")
        .whereRaw("subject ILIKE ?", [`%${trimmedKeyword}%`])
        .orWhereRaw("long_title ILIKE ?", [`%${trimmedKeyword}%`])
        .orWhereRaw("catalog ILIKE ?", [`%${trimmedKeyword}%`])
        .orderBy(sort, 'desc')
        .paginate({
          perPage: 10,
          currentPage: page,
          isLengthAware: true,
        });
      res.json(courses);
    } else {
      const courses = await db("course")
        .whereRaw("subject ILIKE ?", [`%${trimmedKeyword}%`])
        .orWhereRaw("long_title ILIKE ?", [`%${trimmedKeyword}%`])
        .orWhereRaw("catalog ILIKE ?", [`%${trimmedKeyword}%`])
        .orderBy("id")
        .paginate({
          perPage: 10,
          currentPage: page,
          isLengthAware: true,
        });
      res.json(courses);
    }
  }
);

module.exports = courseRouter;
