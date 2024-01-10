const { Pool } = require("pg");
const pool = require('../config');

const createContactTable = `
  CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    telephone VARCHAR(15),
    email VARCHAR(255),
    photo VARCHAR(255),
    address VARCHAR(255),
    labels VARCHAR(255)[] DEFAULT '{}',
    favorite BOOLEAN DEFAULT false
  );
`;

pool.query(createContactTable)
  .then(() => console.log('Contact table created successfully'))
  .catch(err => console.error('Error creating contact table:', err));

