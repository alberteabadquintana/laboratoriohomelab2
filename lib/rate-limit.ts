import pool from "@/lib/db";

interface RateLimitOptions {
  key: string;
  max: number;
  windowMs: number;
}

// Respaldo en memoria: solo se usa si la tabla `rate_limits` no existe o la
// base de datos falla. En serverless este respaldo es por instancia, por eso
// la fuente de verdad es PostgreSQL.
const memoryStore = new Map<string, { count: number; windowStart: number }>();

function checkMemory({ key, max, windowMs }: RateLimitOptions): boolean {
  const now = Date.now();
  const entry = memoryStore.get(key);

  if (!entry || now - entry.windowStart > windowMs) {
    memoryStore.set(key, { count: 1, windowStart: now });
    return true;
  }

  if (entry.count >= max) {
    return false;
  }

  entry.count++;
  return true;
}

/**
 * Rate limit atómico y compartido entre instancias usando PostgreSQL.
 * Si la consulta falla, cae a un contador en memoria para no bloquear la app.
 */
export async function checkRateLimit(options: RateLimitOptions): Promise<boolean> {
  const { key, max, windowMs } = options;
  const cutoff = new Date(Date.now() - windowMs);

  try {
    const res = await pool.query(
      `INSERT INTO rate_limits (key, count, window_start)
       VALUES ($1, 1, now())
       ON CONFLICT (key) DO UPDATE SET
         count = CASE
           WHEN rate_limits.window_start < $2 THEN 1
           ELSE rate_limits.count + 1
         END,
         window_start = CASE
           WHEN rate_limits.window_start < $2 THEN now()
           ELSE rate_limits.window_start
         END
       RETURNING count`,
      [key, cutoff]
    );

    // Limpieza oportunista de claves antiguas (1% de las llamadas).
    if (Math.random() < 0.01) {
      pool
        .query("DELETE FROM rate_limits WHERE window_start < now() - interval '1 day'")
        .catch(() => undefined);
    }

    const count = Number(res.rows[0]?.count ?? 1);
    return count <= max;
  } catch (error: unknown) {
    console.error(
      "Rate limit en BD no disponible, usando memoria:",
      error instanceof Error ? error.message : error
    );
    return checkMemory(options);
  }
}
