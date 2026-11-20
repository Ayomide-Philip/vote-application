import "server-only";
import { Pool } from "pg";

const globalForPg = globalThis as unknown as {
  pool: Pool | undefined;
};

export const pool =
  globalForPg.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    // Uncomment below if connecting to a hosted DB (Neon, Supabase, AWS) requiring SSL:
    // ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

// Prevent unhandled errors on idle clients from crashing the server
pool.on("error", (err) => {
  console.error("Unexpected error on idle PostgreSQL client:", err);
});

if (process.env.NODE_ENV !== "production") {
  globalForPg.pool = pool;
}

export const query = (text: string, params?: unknown[]) => {
  return pool.query(text, params);
};

export default pool;
