import pool from "../config/db-config.js" // Import DB connection

// Function to execute queries
export const executeQuery = async (queryText, params = []) => {
  const client = await pool.connect();
  try {
    const result = await client.query(queryText, params);
    return result.rows;
  } catch (error) {
    console.error("Query Execution Error:", error);
    throw error;
  } finally {
    client.release();
  }
};
