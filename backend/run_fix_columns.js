const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const connectionString =
  "postgresql://postgres:Mudralaya.Fintech@db.mhsizqmhqngcaztresmh.supabase.co:5432/postgres";

const client = new Client({
  connectionString: connectionString,
});

async function runFix() {
  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL");

    const schemaPath = path.join(
      __dirname,
      "..",
      "supabase",
      "fix_missing_columns.sql"
    );
    const sql = fs.readFileSync(schemaPath, "utf8");

    console.log("Executing column fix...");
    await client.query(sql);

    console.log("Columns added successfully.");

    // Reload schema cache
    await client.query("NOTIFY pgrst, 'reload schema';");
    console.log("Schema cache reloaded.");
  } catch (err) {
    console.error("Fix failed:", err);
  } finally {
    await client.end();
  }
}

runFix();
