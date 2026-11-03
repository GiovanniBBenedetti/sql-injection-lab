const pool = require("../config/database");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "jwt_secret_key";

const showLogin = (req, res) => {
  res.render("login", { error: null });
};

const login = (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  pool.query(query, (err, results) => {
    if (err) {
      return res.render("login", { error: err.message });
    }

    if (results.length > 0) {
      const user = results[0];
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, { httpOnly: true });
      return res.redirect("/dashboard");
    }

    return res.render("login", { error: "Usuário ou senha inválidos" });
  });
};

const showDashboard = (req, res) => {
  res.render("dashboard", { user: req.user });
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};

module.exports = { showLogin, login, showDashboard, logout };
