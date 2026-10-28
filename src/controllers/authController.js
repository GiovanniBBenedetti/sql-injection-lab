const pool = require("../config/database");

const login = (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message, query });
    }

    if (results.length > 0) {
      req.session.user = results[0];
      return res.status(200).json({
        message: "Login realizado com sucesso",
        user: results[0],
      });
    }

    return res.status(401).json({ message: "Usuário ou senha inválidos" });
  });
};

const logout = (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "Logout realizado com sucesso" });
};

module.exports = { login, logout };
