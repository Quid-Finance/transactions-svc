import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { UsersModule } from './users/UsersModule';
import { PhotosModule } from './photos/PhotosModule';
import { EnvironmentVariables } from './env';
import { TransactionsModule } from './utils/transactions/TransactionsModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        dialect: 'postgres',
        database: configService.get('DATABASE_NAME', { infer: true }),
        host: configService.get('DATABASE_HOST', { infer: true }),
        username: configService.get('DATABASE_USERNAME', { infer: true }),
        password: configService.get('DATABASE_PASSWORD', { infer: true }),
        port: configService.get('DATABASE_PORT', { infer: true }) ?? 5432,
        autoLoadModels: true,
        synchronize: configService.get('NODE_ENV', { infer: true }) === 'test',
        logging:
          configService.get('NODE_ENV', { infer: true }) === 'development'
            ? console.log
            : false,
      }),
      inject: [ConfigService],
    }),
    TransactionsModule,
    UsersModule,
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
