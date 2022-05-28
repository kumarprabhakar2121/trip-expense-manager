require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cookieParser = require("cookie-parser");
let cors = require("cors");
const logger = require("morgan");

const app = express();
app.use(logger("dev"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.options("*", cors());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({
    msg: "Zaira"
  });
});
app.post("/form", (req, res) => {
  console.log(req.body);
  // res.render("form");
  res.json({ success: true });
});


const tripRoute = require("./route/trip_route.js")


app.use("/trip", tripRoute);

module.exports = app;
