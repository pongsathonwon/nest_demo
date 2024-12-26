import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuth } from './auth.interface';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController implements IAuth {
  constructor(private readonly authService: AuthService) { }

  @Post("/signin")
  signIn(@Body() createBody: CreateAuthDto) {
    return this.authService.signIn(createBody)
  }

  @Post("/login")
  logIn(@Body() loginBody: LoginAuthDto) {
    return this.authService.logIn(loginBody)
  }

  @Post("/logout")
  logOut() {
    return this.authService.logOut()
  }
}
