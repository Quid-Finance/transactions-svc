import { Controller, Get, Inject } from '@nestjs/common';
import {
  ITransactionsService,
  TRANSACTIONS_SERVICE_TOKEN,
} from './domain/ITransactionsService';
import { TransactionDTO } from './dto/TransactionDTO';
import {
  ITransactionsMapper,
  TRANSACTIONS_MAPPER_TOKEN,
} from './mappers/ITransactionsMapper';

@Controller('transactions')
export class TransactionsController {
  constructor(
    @Inject(TRANSACTIONS_SERVICE_TOKEN)
    private readonly transactionsService: ITransactionsService,
    @Inject(TRANSACTIONS_MAPPER_TOKEN)
    private readonly transactionsMapper: ITransactionsMapper,
  ) { }

  @Get()
  async getTransactions(): Promise<TransactionDTO[]> {
    const transactions = await this.transactionsService.getTransactions();
    return transactions.map(this.transactionsMapper.toDTO);
  }
}
