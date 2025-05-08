import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  ValidationPipe,
} from '@nestjs/common';
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
  ) {}

  @Get()
  async getAll(): Promise<TransactionDTO[]> {
    const transactions = await this.transactionsService.getAll();
    return transactions.map((transaction) =>
      this.transactionsMapper.toDTO(transaction),
    );
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) transactionDTO: TransactionDTO,
  ): Promise<TransactionDTO> {
    const transaction = await this.transactionsService.create(
      this.transactionsMapper.fromDTOToDomain(transactionDTO),
    );
    return this.transactionsMapper.toDTO(transaction);
  }
}
