import { Injectable } from '@nestjs/common';
import { ITransactionsMapper } from '../ITransactionsMapper';
import { Transaction } from 'src/transactions/Model';
import { TransactionDTO } from 'src/transactions/dto/TransactionDTO';

@Injectable()
export class DefaultTransactionsMapper implements ITransactionsMapper {
  toDTO(transaction: Transaction): TransactionDTO {
    return {
      id: transaction.id,
      amount: transaction.amount.toString(),
    };
  }
}
