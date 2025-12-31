const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

// Connection string from user's initial request
const connectionString =
  "postgresql://postgres:Mudralaya.Fintech@db.mhsizqmhqngcaztresmh.supabase.co:5432/postgres";

const client = new Client({
  connectionString: connectionString,
});

async function runStorageMigration() {
  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL");

    const schemaPath = path.join(__dirname, "..", "supabase", "storage.sql");
    const sql = fs.readFileSync(schemaPath, "utf8");

    console.log("Executing storage.sql...");
    await client.query(sql);

    console.log("Storage migration completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}

runStorageMigration();
