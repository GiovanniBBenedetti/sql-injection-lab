const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(path.join(__dirname, "..", "public")));

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

module.exports = app;
