import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from 'src/transactions/Model';
import {
  ITransactionsRepository,
  TRANSACTIONS_REPOSITORY_TOKEN,
} from 'src/transactions/repositories/ITransactionsRepository';
import { ITransactionsService } from '../ITransactionsService';

@Injectable()
export class DefaultTransactionsService implements ITransactionsService {
  constructor(
    @Inject(TRANSACTIONS_REPOSITORY_TOKEN)
    private readonly transactionsRepository: ITransactionsRepository,
  ) { }

  async getAll(): Promise<Transaction[]> {
    return this.transactionsRepository.getAll();
  }

  async create(transaction: Transaction): Promise<Transaction> {
    return this.transactionsRepository.create(transaction);
  }
}
