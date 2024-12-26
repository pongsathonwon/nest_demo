import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuth } from './auth.interface';

@Controller('auth')
export class AuthController implements IAuth {
  constructor(private readonly authService: AuthService) { }

  @Post("/auth/signin")
  signIn() {
    this.authService.signIn()
  }

  @Post("/auth/login")
  logIn() {
    this.authService.logIn()
  }

  @Post("/auth/logout")
  logOut() {
    this.authService.logOut()
  }
}
