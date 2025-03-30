import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from 'src/transactions/Model';
import {
  ITransactionsRepository,
  TRANSACTIONS_REPOSITORY_TOKEN,
} from 'src/transactions/repositories/ITransactionsRepository';

@Injectable()
export class DefaultTransactionsService {
  constructor(
    @Inject(TRANSACTIONS_REPOSITORY_TOKEN)
    private readonly transactionsRepository: ITransactionsRepository,
  ) { }

  async getTransactions(): Promise<Transaction[]> {
    return this.transactionsRepository.getTransactions();
  }
}
