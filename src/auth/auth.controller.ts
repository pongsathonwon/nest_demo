import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, Logout, Signin } from './auth.interface';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController implements Signin, Login, Logout {
  constructor(private readonly authService: AuthService) { }

  @Post("/signin")
  signin(@Body() createBody: CreateAuthDto) {
    return this.authService.signin(createBody)
  }

  @Post("/login")
  login(@Body() loginBody: LoginAuthDto) {
    return this.authService.login(loginBody)
  }

  @Post("/logout")
  logout() {
    //jwt is stateless cannot logout unless impl refresh token > remove refresh token
  }
}
