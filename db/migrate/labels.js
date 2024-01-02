const { Pool } = require("pg");
const pool = require('../config');

const createLabelTable = `
  CREATE TABLE IF NOT EXISTS labels (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(255) NOT NULL
  );
`;

pool.query(createLabelTable)
  .then(() => console.log('Label table created successfully'))
  .catch(err => console.error('Error creating label table:', err));
