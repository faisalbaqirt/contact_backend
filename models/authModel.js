const pool = require("../db/config");

const registerUser = async (username, hashedPassword) => {
  try {
    const query =
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username";
    const result = await pool.query(query, [username, hashedPassword]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getByUsername = async (username) => {
  try {
    const query = "SELECT * FROM users WHERE username = $1 LIMIT 1";
    const result = await pool.query(query, [username]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
  getByUsername,
};
