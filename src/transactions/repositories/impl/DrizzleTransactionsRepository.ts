import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION_TOKEN } from 'src/drizzle/DrizzleModule';
import {
  TRANSACTIONS_SCHEMA_TOKEN,
  TransactionSchema,
} from 'src/transactions/Schema';
import { ITransactionsRepository } from '../ITransactionsRepository';
import { Transaction } from 'src/transactions/Model';
import {
  ITransactionsMapper,
  TRANSACTIONS_MAPPER_TOKEN,
} from 'src/transactions/mappers/ITransactionsMapper';

@Injectable()
export class DrizzleTransactionsRepository implements ITransactionsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION_TOKEN)
    private readonly db: NodePgDatabase,
    @Inject(TRANSACTIONS_SCHEMA_TOKEN)
    private readonly transactions: TransactionSchema,
    @Inject(TRANSACTIONS_MAPPER_TOKEN)
    private readonly transactionsMapper: ITransactionsMapper,
  ) { }
  async getAll(): Promise<Transaction[]> {
    return this.db.select().from(this.transactions);
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const newTransaction = await this.db
      .insert(this.transactions)
      .values({
        id: transaction.id,
        amount: transaction.amount,
      })
      .returning();

    return this.transactionsMapper.fromEntityToDomain(newTransaction[0]);
  }
}
