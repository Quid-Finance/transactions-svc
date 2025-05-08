import { Transaction } from '../Model';

export const TRANSACTIONS_SERVICE_TOKEN = 'TRANSACTIONS_SERVICE';

export interface ITransactionsService {
  getAll(): Promise<Transaction[]>;
  create(transaction: Transaction): Promise<Transaction>;
}
