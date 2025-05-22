// db.js
const mysql = require('mysql2/promise');

const poolConfig = {
  host: process.env.db_host,
  port: process.env.db_port,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database,
  ssl: {
    rejectUnauthorized: false,
  },
};

let pool;

async function initializePool() {
  try {
    pool = mysql.createPool(poolConfig);

    // Test the connection
    const connection = await pool.getConnection();
    console.log('Connected to database:', poolConfig.database);
    connection.release();
  } catch (err) {
    console.error('Failed to connect:', err.message);
    process.exit(1);
  }
}

initializePool();

function getPool() {
  if (!pool) {
    throw new Error('[MySQL] Connection pool has not been initialized.');
  }
  return pool;
}

module.exports = getPool;
