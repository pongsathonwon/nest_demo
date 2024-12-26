import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
