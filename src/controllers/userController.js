const pool = require("../config/database");

const search = (req, res) => {
  const { name } = req.query;

  const query = `SELECT id, username, email FROM users WHERE username LIKE '%${name}%'`;

  pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message, query });
    }

    return res.status(200).json({ results, query });
  });
};

module.exports = { search };
