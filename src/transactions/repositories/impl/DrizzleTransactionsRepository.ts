import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION_TOKEN } from 'src/drizzle/DrizzleModule';
import {
  TRANSACTIONS_SCHEMA_TOKEN,
  TransactionSchema,
} from 'src/transactions/Schema';
import { ITransactionsRepository } from '../ITransactionsRepository';
import { Transaction } from 'src/transactions/Model';

@Injectable()
export class DrizzleTransactionsRepository implements ITransactionsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION_TOKEN)
    private readonly db: NodePgDatabase,
    @Inject(TRANSACTIONS_SCHEMA_TOKEN)
    private readonly transactions: TransactionSchema,
  ) { }

  async getTransactions(): Promise<Transaction[]> {
    return this.db.select().from(this.transactions);
  }
}
