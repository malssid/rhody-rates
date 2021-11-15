require("dotenv").config();
const express = require("express");
const cors = require("cors");
const studentRouter = require("./routes/Auth");
const courseRouter = require("./routes/Course");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(passport.initialize());

app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use("/auth", studentRouter);

app.use("/course", courseRouter);

app.listen(PORT, () => {
  console.log("Server started on http://localhost:4000");
});
