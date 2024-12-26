import { Injectable, NotFoundException } from '@nestjs/common';
import { IAuth } from './auth.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService implements IAuth {
    constructor(private _prisma: PrismaService, private _jwt: JwtService) { }
    async signIn(createBody: CreateAuthDto) {
        console.log(createBody)
        const newUser = await this._prisma.users.create({ data: createBody })
        return { accessToken: this._jwt.sign({ userId: newUser.id, username: newUser.username }) }
    }

    async logIn(loginBody: LoginAuthDto) {
        const user = await this._prisma.users.findUnique({ where: { email: loginBody.email } })
        if (!user) throw new NotFoundException(`invalid email or password`)
        const isCorrectPassword = user.password === loginBody.password
        if (!isCorrectPassword) throw new NotFoundException(`invalid email or password`)
        return { accessToken: this._jwt.sign({ userId: user.id, username: user.username }) }
    }

    async logOut() { }
}
