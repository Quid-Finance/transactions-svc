import { Global, Module } from '@nestjs/common';
import { TRANSACTION_MANAGER_TOKEN } from './ITransactionManager';
import { SequelizeTransactionManager } from './impl/SequelizeTransactionManager';

@Global()
@Module({
  providers: [
    {
      provide: TRANSACTION_MANAGER_TOKEN,
      useClass: SequelizeTransactionManager,
    },
  ],
  exports: [TRANSACTION_MANAGER_TOKEN],
})
export class TransactionsModule { }
