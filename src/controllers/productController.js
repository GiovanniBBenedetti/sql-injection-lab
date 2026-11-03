const pool = require("../config/database");

const list = (req, res) => {
  const query = "SELECT id, name, description, price, category FROM products";

  pool.query(query, (err, results) => {
    if (err) {
      return res.render("products/index", { products: [], error: err.message });
    }

    return res.render("products/index", { products: results, error: null });
  });
};

const getById = (req, res) => {
  const { id } = req.params;

  const sqlQuery = `SELECT id, name, description, price FROM products WHERE id = ${id}`;

  pool.query(sqlQuery, (err, results) => {
    if (err) {
      return res.render("products/show", { product: null, sqlQuery: err.message, id });
    }

    const product = results.length > 0 ? results[0] : null;
    return res.render("products/show", { product, sqlQuery, id });
  });
};

module.exports = { list, getById };
