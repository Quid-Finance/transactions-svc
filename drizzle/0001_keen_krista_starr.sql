CREATE EXTENSION IF NOT EXISTS pgcrypto;
ALTER TABLE "transactions" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
