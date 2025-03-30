import { Module, DynamicModule, Global, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { EnvironmentVariables } from 'src/env';
import { transactions } from 'src/transactions/Schema';

export const DATABASE_CONNECTION_TOKEN = 'DATABASE_CONNECTION';

@Global()
@Module({})
export class DrizzleModule {
  static forRoot(): DynamicModule {
    const connectionProvider: Provider = {
      provide: DATABASE_CONNECTION_TOKEN,
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => {
        const database = configService.get('DATABASE_NAME', { infer: true });
        const host = configService.get('DATABASE_HOST', { infer: true });
        const user = configService.get('DATABASE_USERNAME', { infer: true });
        const password = configService.get('DATABASE_PASSWORD', {
          infer: true,
        });
        const port =
          configService.get('DATABASE_PORT', { infer: true }) ?? 5432;

        if (!database || !host || !user || !password) {
          throw new Error('Database configuration is missing');
        }

        const pool = new Pool({
          database,
          host,
          user,
          password,
          port,
        });

        return drizzle(pool, {
          casing: 'snake_case',
          schema: {
            ...transactions,
          },
        });
      },
      inject: [ConfigService],
    };

    return {
      module: DrizzleModule,
      imports: [ConfigModule],
      providers: [connectionProvider],
      exports: [DATABASE_CONNECTION_TOKEN],
    };
  }
}
