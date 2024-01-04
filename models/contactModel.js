const pool = require("../db/config");

const getAllContactList = async (userId) => {
  try {
    const query = "SELECT * FROM contacts WHERE user_id = $1";
    const data = await pool.query(query, [userId]);
    return data.rows;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (userId, contactId) => {
  try {
    const query = "SELECT * FROM contacts WHERE user_id = $1 AND id = $2";
    const data = await pool.query(query, [userId, contactId]);
    return data.rows;
  } catch (error) {
    throw error;
  }
}
;
const getContactByLabel = async (userId, label) => {
  try {
    const query = "SELECT * FROM contacts WHERE user_id = $1 AND $2 = ANY(labels)";
    const data = await pool.query(query, [userId, label]);
    return data.rows;
  } catch (error) {
    throw error;
  }
};

const createContact = async (
  userId,
  name,
  telephone,
  email,
  address,
  labels
) => {
  try {
    const query =
      "INSERT INTO contacts (user_id, name, telephone, email, address, labels) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = [userId, name, telephone, email, address, labels];
    await pool.query(query, values);
  } catch (error) {
    throw error;
  }
};

const updateContact = async (id, name, telephone, email, address, labels) => {
  try {
    const query =
      "UPDATE contacts SET name = $1, telephone = $2, email = $3, address = $4, labels = $5 WHERE id = $6";
    const values = [name, telephone, email, address, labels, id];
    await pool.query(query, values);
  } catch (error) {
    throw error;
  }
};

const deleteContact = async (id) => {
  try {
    const query = "DELETE FROM contacts WHERE id = $1 RETURNING id";
    const result = await pool.query(query, [id]);
    return result[0];
  } catch (error) {
    throw error;
  }
};

const addLabelToContact = async (contactId, label) => {
  try {
    const query = "UPDATE contacts SET labels = array_append(labels, $1) WHERE id = $2";
    await pool.query(query, [label, contactId]);
  } catch (error) {
    throw error;
  }
};

const removeLabelFromContact = async (contactId, label) => {
  try {
    const query = "UPDATE contacts SET labels = array_remove(labels, $1) WHERE id = $2";
    await pool.query(query, [label, contactId]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllContactList,
  getContactById,
  getContactByLabel,
  createContact,
  updateContact,
  deleteContact,
  addLabelToContact,
  removeLabelFromContact
};
