import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientUnknownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(ex: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    const message = ex.message
    switch (ex.code) {
      case 'P2002':
        const status = HttpStatus.CONFLICT
        res.status(status).json({
          message
        })
        break;

      case "P2025":
        res.status(404).json({ message })
        break;

      default:
        super.catch(ex, host)
    }
  }
}
