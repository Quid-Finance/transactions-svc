import { Transaction as SequelizeTransaction } from 'sequelize';

// WARN: Not ideal, but I don't really know what to do about it
// Sequelize transactions need to have a LOCK which will make the
// interface too specific
export type Transaction = SequelizeTransaction;
