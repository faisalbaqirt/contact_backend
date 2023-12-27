const { Pool } = require("pg");
const pool = require('../config');

const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    telephone VARCHAR(15),
    email VARCHAR(255),
    address VARCHAR(255)
  );
`;

pool.query(createUserTable)
  .then(() => console.log('User table created successfully'))
  .catch(err => console.error('Error creating user table:', err));

  
