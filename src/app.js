const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "..", "public")));

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.get("/", (req, res) => res.redirect("/login"));

app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

module.exports = app;
