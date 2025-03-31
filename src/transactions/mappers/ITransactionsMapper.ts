import { TransactionDTO } from '../dto/TransactionDTO';
import { Transaction } from '../Model';
import { TransactionEntity } from '../Schema';

export const TRANSACTIONS_MAPPER_TOKEN = 'TRANSACTIONS_MAPPER';

export interface ITransactionsMapper {
  toDTO(transaction: Transaction): TransactionDTO;
  fromDTOToDomain(transactionDTO: TransactionDTO): Transaction;
  fromEntityToDomain(transactionEntity: TransactionEntity): Transaction;
}
