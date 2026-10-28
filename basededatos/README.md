# Base de datos

Este directorio versiona el esquema que usa la web de HomeLab.

## Archivos

- `schema.sql`: tablas, claves foráneas e índices reconstruidos a partir de las
  consultas en `app/actions.ts`. **Revisa los tipos exactos contra la base real**
  antes de aplicarlo en producción.

## Uso

```bash
psql "$DATABASE_URL" -f basededatos/schema.sql
```

El script usa `CREATE TABLE IF NOT EXISTS`, así que no borra datos existentes.
Si tu base actual ya tiene estas tablas, solo agrega lo que falte (por ejemplo
`rate_limits`).

## Rate limiting

`lib/rate-limit.ts` usa la tabla `rate_limits`. Si no existe, la app sigue
funcionando con un contador en memoria por instancia, pero en producción
(Vercel/serverless) debes crear la tabla para que el límite sea compartido.
