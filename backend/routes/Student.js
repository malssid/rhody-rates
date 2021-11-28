const express = require("express");
const studentRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const db = require("../dbConnect");
const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 6000,
  max: 1,
  handler: (req, res) => {
    return res.status(429).json({
      message: "Please wait 6 seconds before rating another course",
    });
  },
});

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

studentRouter.post(
  "/ratings/:id",
  passport.authenticate("jwt", { session: false }),
  rateLimiter,
  async (req, res) => {
    const id = parseInt(req.params.id);
    const { type } = req.body;
    const ratings = await db("student")
      .where({ id: req.user.id })
      .select("likes", "dislikes");
    const liked = ratings[0].likes.includes(id);
    const disliked = ratings[0].dislikes.includes(id);

    try {
      if (!liked && !disliked) {
        if (type === "like") {
          const newLikes = ratings[0].likes.concat(id);
          const result = await db("course")
            .where({ id: id })
            .increment("likes", 1);
          const result2 = await db("student")
            .where({ id: req.user.id })
            .update({ likes: newLikes });
          if (result && result2) {
            res.status(200).json({ message: "Rating updated" });
          }
        } else if (type === "dislike") {
          const newDislikes = ratings[0].dislikes.concat(id);
          const result = await db("course")
            .where({ id: id })
            .increment("dislikes", 1);
          const result2 = await db("student")
            .where({ id: req.user.id })
            .update({ dislikes: newDislikes });
          if (result && result2) {
            res.status(200).json({ message: "Rating updated" });
          }
        }
      } else if (!liked && disliked) {
        if (type === "like") {
          const newLikes = ratings[0].likes.concat(id);
          const newDislikes = ratings[0].dislikes.filter(
            (course) => course !== id
          );
          const result = await db("course")
            .where({ id: id })
            .increment("likes", 1)
            .decrement("dislikes", 1);
          const result2 = await db("student")
            .where({ id: req.user.id })
            .update({ likes: newLikes, dislikes: newDislikes });
          if (result && result2) {
            res.status(200).json({ message: "Rating updated" });
          }
        } else if (type === "dislike") {
          const newDislikes = ratings[0].dislikes.filter(
            (course) => course !== id
          );
          const result = await db("course")
            .where({ id: id })
            .decrement("dislikes", 1);
          const result2 = await db("student")
            .where({ id: req.user.id })
            .update({ dislikes: newDislikes });
          if (result && result2) {
            res.status(200).json({ message: "Rating updated" });
          }
        }
      } else if (liked && !disliked) {
        if (type === "like") {
          const newLikes = ratings[0].likes.filter((course) => course !== id);
          const result = await db("course")
            .where({ id: id })
            .decrement("likes", 1);
          const result2 = await db("student")
            .where({ id: req.user.id })
            .update({ likes: newLikes });
          if (result && result2) {
            res.status(200).json({ message: "Rating updated" });
          }
        } else if (type === "dislike") {
          const newLikes = ratings[0].likes.filter((course) => course !== id);
          const newDislikes = ratings[0].dislikes.concat(id);
          const result = await db("course")
            .where({ id: id })
            .decrement("likes", 1)
            .increment("dislikes", 1);
          const result2 = await db("student")
            .where({ id: req.user.id })
            .update({ likes: newLikes, dislikes: newDislikes });
          if (result && result2) {
            res.status(200).json({ message: "Rating updated" });
          }
        }
      }
    } catch (err) {
      res.status(500).json({ message: "Error has occured" });
    }
  }
);

module.exports = studentRouter;
