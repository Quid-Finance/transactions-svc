import { Injectable } from '@nestjs/common';
import { ITransactionsMapper } from '../ITransactionsMapper';
import { Transaction } from 'src/transactions/Model';
import { TransactionDTO } from 'src/transactions/dto/TransactionDTO';
import { TransactionEntity } from 'src/transactions/Schema';

@Injectable()
export class DefaultTransactionsMapper implements ITransactionsMapper {
  toDTO(transaction: Transaction): TransactionDTO {
    return {
      id: transaction.id,
      amount: transaction.amount.toString(),
    };
  }

  fromDTOToDomain(transactionDTO: TransactionDTO): Transaction {
    return {
      id: transactionDTO.id,
      amount: BigInt(transactionDTO.amount),
    };
  }

  fromEntityToDomain(transactionEntity: TransactionEntity): Transaction {
    return {
      id: transactionEntity.id,
      amount: BigInt(transactionEntity.amount),
    };
  }
}
