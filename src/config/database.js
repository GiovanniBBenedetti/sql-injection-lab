const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "appuser",
  password: process.env.DB_PASSWORD || "apppassword",
  database: process.env.DB_NAME || "vulnerable_app",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
