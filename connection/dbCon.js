const { credentials } = require("../config/dbConfig");
const { Pool } = require("pg");

const pool = new Pool({
  ...credentials,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("error", (err) => {
  console.error("Unexpected PG Pool Error", err);
});

const isRetryableError = (error) => {
  const retryableCodes = [
    "40001", // serialization_failure
    "40P01", // deadlock_detected
    "53300", // too_many_connections
    "57P03", // cannot_connect_now
  ];
  return retryableCodes.includes(error.code);
};

exports.PoolResult = async (query, values = []) => {
  let attempt = 0;

  while (attempt < 2) {
    try {
      attempt++;
      return await pool.query(query, values);
    } catch (error) {
      console.error("Postgres query error:", error.message);

      if (attempt === 1 && isRetryableError(error)) {
        console.warn("Retrying DB query once...");
        continue;
      }

      throw error;
    }
  }
};
