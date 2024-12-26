import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './prisma-exception/prisma-exception.filter';
import * as cookieParser from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter))
  await app.listen(process.env.PORT ?? 3000);


}
bootstrap();
