import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientUnknownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(ex: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    super.catch(ex, host)
  }
}
