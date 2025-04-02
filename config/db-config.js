import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded from the .env file

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || 'user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'db-projects',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

// Test the database connection
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Connected to the database successfully');
    client.release(); // Release the client back to the pool
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

testConnection();

export default pool;
