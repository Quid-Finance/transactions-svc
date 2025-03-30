import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './AppController';
import { DrizzleModule } from './drizzle/DrizzleModule';
import { TransactionsModule } from './transactions/TransactionsModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    DrizzleModule.forRoot(),
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
