const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
const { credentials } = require("../config/dbConfig");

const pool = new Pool(credentials);

const MIGRATIONS_DIR = path.join(__dirname, "migrations");

async function ensureMigrationTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migration_history (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

async function getExecutedMigrations() {
  const { rows } = await pool.query(
    "SELECT filename FROM migration_history"
  );
  return new Set(rows.map(r => r.filename));
}

async function runMigrations() {
  console.log("🚀 Running database migrations...");

  await ensureMigrationTable();

  const executed = await getExecutedMigrations();

  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter(f => f.endsWith(".sql"))
    .sort(); // V001, V002, ...

  for (const file of files) {
    if (executed.has(file)) {
      console.log(`⏭️  Skipping already applied: ${file}`);
      continue;
    }

    const sql = fs.readFileSync(
      path.join(MIGRATIONS_DIR, file),
      "utf8"
    );

    console.log(`▶️  Applying migration: ${file}`);

    try {
      await pool.query("BEGIN");
      await pool.query(sql);
      await pool.query(
        "INSERT INTO migration_history(filename) VALUES ($1)",
        [file]
      );
      await pool.query("COMMIT");

      console.log(`✅ Applied: ${file}`);
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error(`❌ Migration failed: ${file}`);
      console.error(error.message);
      process.exit(1); // fail CI
    }
  }

  console.log("🎉 All migrations completed successfully");
}

runMigrations()
  .catch(err => {
    console.error("Migration runner error:", err);
    process.exit(1);
  });
