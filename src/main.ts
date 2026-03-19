import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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

  const port = process.env.PORT || 3000;

  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}
bootstrap();
