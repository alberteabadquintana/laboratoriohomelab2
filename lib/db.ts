import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Para conexiones locales en desarrollo puedes usar:
  // max: 20, // máximo número de clientes en el pool
  // idleTimeoutMillis: 30000,
});

export default pool;
