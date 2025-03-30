import { Transaction } from 'src/transactions/Model';

export const TRANSACTIONS_REPOSITORY_TOKEN = 'TRANSACTIONS_REPOSITORY';

export interface ITransactionsRepository {
  getTransactions(): Promise<Transaction[]>;
}
