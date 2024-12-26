import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProductsModule, AuthModule, ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" })],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
