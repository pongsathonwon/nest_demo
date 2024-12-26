import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, Logout, Signin } from './auth.interface';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController implements Signin, Login, Logout {
  constructor(private readonly authService: AuthService) { }

  @Post("/signin")
  async signin(@Body() createBody: CreateAuthDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.signin(createBody)
    res.cookie('access_token', accessToken, { httpOnly: true })
    return { message: 'sign in success' }
  }

  @Post("/login")
  async login(@Body() loginBody: LoginAuthDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.login(loginBody)
    res.cookie('access_token', accessToken, { httpOnly: true })
    return { message: 'sign in success' }
  }

  @Post("/logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token')
  }
}
