const pool = require("../config/database");

const list = (req, res) => {
  const query = "SELECT id, name, description, price FROM products";

  pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json({ results });
  });
};

const getById = (req, res) => {
  const { id } = req.params;

  const query = `SELECT id, name, description, price FROM products WHERE id = ${id}`;

  pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message, query });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    return res.status(200).json({ results, query });
  });
};

module.exports = { list, getById };
