import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PassportModule, JwtModule.register({ secret: "mysrc", signOptions: { expiresIn: "5m" } })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule { }
