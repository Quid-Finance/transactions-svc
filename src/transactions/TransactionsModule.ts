import { Module } from '@nestjs/common';
import { transactions, TRANSACTIONS_SCHEMA_TOKEN } from './Schema';
import { DrizzleTransactionsRepository } from './repositories/impl/DrizzleTransactionsRepository';
import { TRANSACTIONS_REPOSITORY_TOKEN } from './repositories/ITransactionsRepository';
import { TRANSACTIONS_SERVICE_TOKEN } from './domain/ITransactionsService';
import { DefaultTransactionsService } from './domain/impl/DefaultTransactionsService';
import { TRANSACTIONS_MAPPER_TOKEN } from './mappers/ITransactionsMapper';
import { DefaultTransactionsMapper } from './mappers/impl/DefaultTransactionsMapper';
import { TransactionsController } from './TransactionsController';

@Module({
  providers: [
    {
      provide: TRANSACTIONS_SCHEMA_TOKEN,
      useValue: transactions,
    },
    {
      provide: TRANSACTIONS_REPOSITORY_TOKEN,
      useClass: DrizzleTransactionsRepository,
    },
    {
      provide: TRANSACTIONS_SERVICE_TOKEN,
      useClass: DefaultTransactionsService,
    },
    {
      provide: TRANSACTIONS_MAPPER_TOKEN,
      useClass: DefaultTransactionsMapper,
    },
  ],
  controllers: [TransactionsController],
})
export class TransactionsModule { }
