import { Transaction } from '../Model';

export const TRANSACTIONS_SERVICE_TOKEN = 'TRANSACTIONS_SERVICE';

export interface ITransactionsService {
  getTransactions(): Promise<Transaction[]>;
}
