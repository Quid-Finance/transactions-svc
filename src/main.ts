import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { ConfigModule } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  await ConfigModule.envVariablesLoaded;

  SwaggerModule.setup('swagger', app, () =>
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Template Service')
        .setDescription('The template service API description')
        .setVersion('1.0')
        .addTag('template')
        .build(),
    ),
  );

  await app.listen(process.env.PORT ?? 8080, '::');
}

bootstrap();
