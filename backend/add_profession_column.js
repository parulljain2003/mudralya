const { Client } = require("pg");

// Connection string
const connectionString =
  "postgresql://postgres:Mudralaya.Fintech@db.mhsizqmhqngcaztresmh.supabase.co:5432/postgres";

const client = new Client({
  connectionString: connectionString,
});

async function addProfessionColumn() {
  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL");

    const sql = `
      ALTER TABLE public.users 
      ADD COLUMN IF NOT EXISTS profession text;
    `;

    console.log("Adding profession column...");
    await client.query(sql);

    console.log("Column added successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}

addProfessionColumn();
