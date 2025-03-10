import { Sequelize } from 'sequelize-typescript';
import { ITransactionManager } from '../ITransactionManager';
import { Transaction } from '../Transaction';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SequelizeTransactionManager implements ITransactionManager {
  constructor(private readonly sequelize: Sequelize) { }

  transact<T>(fn: (t: Transaction) => Promise<T>): Promise<T> {
    return this.sequelize.transaction(fn);
  }
}
