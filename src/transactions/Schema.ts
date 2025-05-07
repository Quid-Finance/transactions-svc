import { bigint, pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';

export const TRANSACTIONS_SCHEMA_TOKEN = 'TRANSACTIONS_SCHEMA';

export const transactions = pgTable('transactions', {
  id: uuid().primaryKey().defaultRandom(),
  amount: bigint({ mode: 'bigint' }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type TransactionSchema = typeof transactions;

export type TransactionEntity = typeof transactions.$inferSelect;
// export type NewTransactionEntity = typeof transactions.$inferInsert;

// Here's a basic outline of the schema:
//
// **Transactions Table:**
//
// *   `id` (UUID, Primary Key)
// *   `date` (Date)
// *   `amount` (Decimal)
// *   `description` (String)
// *   `type` (Enum: "expense", "income", "transfer")
// *   `expense_id` (UUID, Foreign Key to Expenses table, nullable)
// *   `income_id` (UUID, Foreign Key to Income table, nullable)
// *   `transfer_id` (UUID, Foreign Key to Transfers table, nullable)
//
// **Expenses Table:**
//
// *   `id` (UUID, Primary Key)
// *   `category` (String)
// *   `transaction_id` (UUID, Foreign Key to Transactions table)
//
// **Income Table:**
//
// *   `id` (UUID, Primary Key)
// *   `source` (String)
// *   `transaction_id` (UUID, Foreign Key to Transactions table)
//
// **Transfers Table:**
//
// *   `id` (UUID, Primary Key)
// *   `from_account` (String)
// *   `to_account` (String)
// *   `transaction_id` (UUID, Foreign Key to Transactions table)
