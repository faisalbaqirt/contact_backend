const pool = require("../db/config");

const registerUser = async (username, hashedPassword) => {
  const query =
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username";
  return await pool.query(query, [username, hashedPassword]);
};

const getByUsername = async (username) => {
  const query = "SELECT * FROM users WHERE username = $1 LIMIT 1";
  return await pool.query(query, [username]);
};

module.exports = {
  registerUser,
  getByUsername
};
