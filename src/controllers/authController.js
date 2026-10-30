const pool = require("../config/database");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "jwt_secret_key";

const login = (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message, query });
    }

    if (results.length > 0) {
      const user = results[0];
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        message: "Login realizado com sucesso",
        token,
        user,
      });
    }

    return res.status(401).json({ message: "Usuário ou senha inválidos" });
  });
};

const logout = (req, res) => {
  res.status(200).json({ message: "Logout realizado com sucesso" });
};

module.exports = { login, logout };
