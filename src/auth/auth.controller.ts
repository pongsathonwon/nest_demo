import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuth } from './auth.interface';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController implements IAuth {
  constructor(private readonly authService: AuthService) { }

  @Post("/signin")
  async signIn(@Body() createBody: CreateAuthDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.signIn(createBody)
    res.cookie('access_token', accessToken, { httpOnly: true })
    return { message: 'sign in success' }
  }

  @Post("/login")
  async logIn(@Body() loginBody: LoginAuthDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.logIn(loginBody)
    res.cookie('access_token', accessToken, { httpOnly: true })
    return { message: 'sign in success' }
  }

  @Post("/logout")
  logOut() {
    return this.authService.logOut()
  }
}
