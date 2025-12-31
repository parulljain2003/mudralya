const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const connectionString =
  "postgresql://postgres:Mudralaya.Fintech@db.mhsizqmhqngcaztresmh.supabase.co:5432/postgres";

const client = new Client({
  connectionString: connectionString,
});

async function runReload() {
  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL");

    const schemaPath = path.join(
      __dirname,
      "..",
      "supabase",
      "reload_schema.sql"
    );
    const sql = fs.readFileSync(schemaPath, "utf8");

    console.log("Executing schema reload...");
    await client.query(sql);

    console.log("Schema cache reloaded successfully.");
  } catch (err) {
    console.error("Reload failed:", err);
  } finally {
    await client.end();
  }
}

runReload();
