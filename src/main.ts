import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { LoggingMiddleware } from 'src/midllewares/logging/logging.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Middleware
  // app.use(new LoggingMiddleware().use) // Cách 1: Áp dụng global
  // Cách 2: Áp dụng vào AppModule

  // Validation
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => {
      return new BadRequestException(
        errors.reduce((acc, error) => {
          return {
            ...acc,
            message: {
              ...acc.message,
              [error.property]: Object.values(error.constraints)[0]
            }
          }
        }, {
          message: {},
          statusCode: 400,
          statusText: 'Bad Request'
        })
      );
    }
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
