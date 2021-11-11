const express = require("express");
const studentRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const db = require("../dbConnect");
const bcrypt = require("bcrypt");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: process.env.JWT_ISS,
      sub: userID,
    },
    process.env.JWT_SECRET,
    { expiresIn: "6d" }
  );
};

studentRouter.post("/signup", async (req, res) => {
  const { username, password, major, year } = req.body;
  try {
    const user = await db("student").where({ username: username });
    if (user.length > 0) {
      res.status(400).json({ message: "Username already exists" });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db("student").insert({
          username: username,
          password: hashedPassword,
          major: major,
          year: year,
          likes: [],
          dislikes: [],
        });
        if (result) {
          res.status(201).json({ message: "Account successfully created" });
        }
      } catch (err) {
        res.status(500).json({ message: "Error has occured" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Error has occured" });
  }
});

studentRouter.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { id, username } = req.user;
      const token = signToken(id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username } });
    }
  }
);

studentRouter.get(
  "/signout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "" }, success: true });
  }
);

studentRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username } });
  }
);

module.exports = studentRouter;
