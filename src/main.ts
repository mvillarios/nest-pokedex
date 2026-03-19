import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // Transforma los payloads a los tipos definidos en los DTOs
      transformOptions: {
        enableImplicitConversion: true, // Permite la conversión implícita de tipos (e.g., string a number)
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
