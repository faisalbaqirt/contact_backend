const pool = require("../db/config");

const getAllLabels = async (userId) => {
  try {
    const query = "SELECT * FROM labels WHERE user_id = $1";
    const data = await pool.query(query, [userId]);
    return data.rows;
  } catch (error) {
    throw error;
  }
};

const createLabel = async (userId, name) => {
  try {
    const query = "INSERT INTO labels (user_id, name) VALUES ($1, $2)";
    await pool.query(query, [userId, name]);
  } catch (error) {
    throw error;
  }
};

const deleteLabel = async (id) => {
  try {
    const query = "DELETE FROM labels WHERE id = $1 RETURNING id";
    const result = await pool.query(query, [id]);
    return result[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllLabels,
  createLabel,
  deleteLabel
};
