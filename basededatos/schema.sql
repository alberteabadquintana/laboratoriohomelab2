-- ============================================================================
-- HomeLab - Esquema de referencia (reconstruido desde las consultas del código)
-- ============================================================================
-- IMPORTANTE: este archivo documenta las tablas y columnas que la web usa.
-- Ajusta tipos/columnas exactos a la base real antes de aplicarlo en producción.
-- Se puede ejecutar con:  psql "$DATABASE_URL" -f basededatos/schema.sql
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ─── Pacientes ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pacientes (
  id                TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  tipo_documento    TEXT NOT NULL DEFAULT 'DNI',
  numero_documento  TEXT NOT NULL UNIQUE,
  nombres           TEXT NOT NULL,
  apellidos         TEXT NOT NULL,
  telefono          TEXT,
  creado_en         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Atenciones (una visita/orden por paciente) ──────────────────────────────
CREATE TABLE IF NOT EXISTS atenciones (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  paciente_id     TEXT NOT NULL REFERENCES pacientes(id),
  codigo          TEXT UNIQUE,
  estado          TEXT NOT NULL DEFAULT 'PENDIENTE', -- PENDIENTE | COMPLETADA | ANULADA
  fecha_atencion  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_atenciones_paciente ON atenciones(paciente_id);
CREATE INDEX IF NOT EXISTS idx_atenciones_codigo ON atenciones(codigo);

-- ─── Reservas creadas desde la web ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reservas (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  atencion_id   TEXT NOT NULL REFERENCES atenciones(id),
  codigo        TEXT UNIQUE,
  creado_en     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reservas_atencion ON reservas(atencion_id);
CREATE INDEX IF NOT EXISTS idx_reservas_codigo ON reservas(codigo);

-- ─── Informes (PDF de resultados, versionado) ───────────────────────────────
CREATE TABLE IF NOT EXISTS informes (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  atencion_id   TEXT NOT NULL REFERENCES atenciones(id),
  activo        BOOLEAN NOT NULL DEFAULT true,
  version       INTEGER NOT NULL DEFAULT 1,
  generado_en   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_informes_atencion ON informes(atencion_id) WHERE activo = true;

-- ─── Catálogo de exámenes ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS examenes_catalogo (
  id         TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  nombre     TEXT NOT NULL,
  precio     NUMERIC(10, 2),
  categoria  TEXT,
  activo     BOOLEAN NOT NULL DEFAULT true,
  orden      INTEGER NOT NULL DEFAULT 0,
  creado_en  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_examenes_nombre ON examenes_catalogo (LOWER(nombre));

-- ─── Perfiles / paquetes de exámenes ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS perfiles_examen (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  nombre       TEXT NOT NULL,
  descripcion  TEXT,
  precio       NUMERIC(10, 2),
  activo       BOOLEAN NOT NULL DEFAULT true,
  orden        INTEGER NOT NULL DEFAULT 0,
  creado_en    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS perfiles_examen_detalle (
  perfil_id  TEXT NOT NULL REFERENCES perfiles_examen(id) ON DELETE CASCADE,
  examen_id  TEXT NOT NULL REFERENCES examenes_catalogo(id) ON DELETE CASCADE,
  PRIMARY KEY (perfil_id, examen_id)
);

CREATE INDEX IF NOT EXISTS idx_perfil_detalle_examen ON perfiles_examen_detalle(examen_id);

-- ─── Rate limiting persistente (usado por lib/rate-limit.ts) ─────────────────
-- Sin esta tabla el código cae a un contador en memoria (no compartido entre
-- instancias). Créala en producción para tener límites reales.
CREATE TABLE IF NOT EXISTS rate_limits (
  key           TEXT PRIMARY KEY,
  count         INTEGER NOT NULL DEFAULT 0,
  window_start  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_window ON rate_limits(window_start);
