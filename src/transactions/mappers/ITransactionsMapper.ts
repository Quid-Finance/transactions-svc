import { TransactionDTO } from '../dto/TransactionDTO';
import { Transaction } from '../Model';

export const TRANSACTIONS_MAPPER_TOKEN = 'TRANSACTIONS_MAPPER';

export interface ITransactionsMapper {
  toDTO(user: Transaction): TransactionDTO;
}
