const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const connectionString =
  "postgresql://postgres:Mudralaya.Fintech@db.mhsizqmhqngcaztresmh.supabase.co:5432/postgres";

const client = new Client({
  connectionString: connectionString,
});

async function checkPolicies() {
  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL");

    const schemaPath = path.join(
      __dirname,
      "..",
      "supabase",
      "check_policies.sql"
    );
    const sql = fs.readFileSync(schemaPath, "utf8");

    console.log("Checking policies...");
    const res = await client.query(sql);

    console.log("Policies on users table:");
    if (res.rows.length === 0) {
      console.log("No policies found.");
    } else {
      res.rows.forEach((r) =>
        console.log(`- ${r.policyname} (${r.cmd}): ${r.qual} / ${r.with_check}`)
      );
    }
  } catch (err) {
    console.error("Failed:", err);
  } finally {
    await client.end();
  }
}

checkPolicies();
