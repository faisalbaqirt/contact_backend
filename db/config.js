const { Pool } = require("pg")
require("dotenv").config()

let pool;

if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    connectionString: process.env.DB_CONNECT_PROD + "?sslmode=require"
  });
} else {
  pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432
  });
}

module.exports = pool