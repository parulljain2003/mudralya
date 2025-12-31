const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const connectionString =
  "postgresql://postgres:Mudralaya.Fintech@db.mhsizqmhqngcaztresmh.supabase.co:5432/postgres";

const client = new Client({
  connectionString: connectionString,
});

async function runMigration() {
  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL");

    const schemaPath = path.join(
      __dirname,
      "..",
      "supabase",
      "add_email_column.sql"
    );
    const sql = fs.readFileSync(schemaPath, "utf8");

    console.log("Executing add_email_column.sql...");
    await client.query(sql);

    console.log("Migration successful: email column verified.");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}

runMigration();
