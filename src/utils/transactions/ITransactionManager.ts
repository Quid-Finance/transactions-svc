import { Transaction } from './Transaction';

export const TRANSACTION_MANAGER_TOKEN = 'TRANSACTION_MANAGER';

export interface ITransactionManager {
  transact<T>(fn: (t: Transaction) => Promise<T>): Promise<T>;
}
