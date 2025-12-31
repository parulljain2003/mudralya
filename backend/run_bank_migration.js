// const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "..", "client-dashboard", ".env"),
});

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const connectionString =
  "postgresql://postgres:Mudralaya.Fintech@db.mhsizqmhqngcaztresmh.supabase.co:5432/postgres"; // Hardcoded for migration script consistency

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
  process.exit(1);
}

const { Client } = require("pg");

const client = new Client({
  connectionString: connectionString,
});

async function runMigration() {
  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL");

    const sqlPath = path.resolve(
      __dirname,
      "..",
      "supabase",
      "bank_account_schema.sql"
    );
    const sql = fs.readFileSync(sqlPath, "utf8");

    console.log("Executing migration...");
    await client.query(sql);
    console.log("Migration executed successfully.");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}

runMigration();
