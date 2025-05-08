import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/**/schema.ts',
  out: './drizzle',
  dbCredentials: {
    database: process.env.DATABASE_NAME ?? '',
    host: process.env.DATABASE_HOST ?? '',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT ?? 5432),
    ssl: false,
  },
});
