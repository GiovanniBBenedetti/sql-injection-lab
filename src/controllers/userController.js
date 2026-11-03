const pool = require("../config/database");

const search = (req, res) => {
  const { name } = req.query;

  if (!name && name !== "") {
    return res.render("users/search", { results: null, sqlQuery: null, query: "" });
  }

  const sqlQuery = `SELECT id, username, email FROM users WHERE username LIKE '%${name}%'`;

  pool.query(sqlQuery, (err, results) => {
    if (err) {
      return res.render("users/search", { results: null, sqlQuery: err.message, query: name });
    }

    return res.render("users/search", { results, sqlQuery, query: name });
  });
};

module.exports = { search };
