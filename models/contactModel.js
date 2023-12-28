const pool = require("../db/config")


const getAllContactList = async (userId) => {
    try {
        const query = "SELECT * FROM contacts WHERE user_id = ?"
        const data = await pool.query(query, [userId])
        return data
    } catch (error) {
        throw error
    }
}

const createContact = async (newContact) => {
    try {
        const query = "INSERT INTO contacts SET ?"
        await pool.query(query, newContact)
    } catch (error) {
        throw error;
    }
}

const updateContact = async (id, updatedContact) => {
    try {
        const query = "UPDATE contacts SET ? WHERE id = ?"
        await pool.query(query, [updatedContact, id])
    } catch (error) {
        throw error;
    }
}

const deleteContact = async (id) => {
    try {
        const query = "DELETE FROM contacts WHERE id = ? RETURNING id"
        const result = await pool.query(query, [id])
        return result[0]
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllContactList,
    createContact,
    updateContact,
    deleteContact
}


