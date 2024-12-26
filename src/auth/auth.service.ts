import { Injectable } from '@nestjs/common';
import { IAuth } from './auth.interface';

@Injectable()
export class AuthService implements IAuth {
    async signIn() { }

    async logIn() { }

    async logOut() { }
}
