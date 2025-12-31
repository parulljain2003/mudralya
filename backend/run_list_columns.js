const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const connectionString =
  "postgresql://postgres:Mudralaya.Fintech@db.mhsizqmhqngcaztresmh.supabase.co:5432/postgres";

const client = new Client({
  connectionString: connectionString,
});

async function listColumns() {
  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL");

    const schemaPath = path.join(
      __dirname,
      "..",
      "supabase",
      "list_columns.sql"
    );
    const sql = fs.readFileSync(schemaPath, "utf8");

    console.log("Listing columns...");
    const res = await client.query(sql);

    console.log("Columns in users table:");
    res.rows.forEach((r) => console.log(`- ${r.column_name} (${r.data_type})`));
  } catch (err) {
    console.error("Failed:", err);
  } finally {
    await client.end();
  }
}

listColumns();
