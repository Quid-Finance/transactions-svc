import { Transaction } from 'src/transactions/Model';

export const TRANSACTIONS_REPOSITORY_TOKEN = 'TRANSACTIONS_REPOSITORY';

export interface ITransactionsRepository {
  getAll(): Promise<Transaction[]>;
  create(transaction: Transaction): Promise<Transaction>;
}
