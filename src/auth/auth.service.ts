import { Injectable, NotFoundException } from '@nestjs/common';
import { IAuth } from './auth.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from "bcrypt"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements IAuth {
    constructor(private _prisma: PrismaService, private _jwt: JwtService, private _config: ConfigService) { }
    private async hashing(password: string) {
        return await bcrypt.hash(password, parseInt(this._config.get("SALT")))
    }
    private async compare(plain: string, hashed: string) {
        return await bcrypt.compare(plain, hashed)
    }
    async checkAuth(id: number) {
        return this._prisma.users.findUnique({ select: { id: true, username: true }, where: { id } })
    }
    async signIn(createBody: CreateAuthDto) {
        const { username, email, password } = createBody
        const hashed = await this.hashing(password)
        const newUser = await this._prisma.users.create({ data: { username, email, password: hashed } })
        return { accessToken: this._jwt.sign({ userId: newUser.id, username: newUser.username }) }
    }

    async logIn(loginBody: LoginAuthDto) {
        const { email, password } = loginBody
        const user = await this._prisma.users.findUnique({ where: { email } })
        if (!user) throw new NotFoundException(`invalid email or password`)
        const isCorrectPassword = this.compare(password, user.password)
        if (!isCorrectPassword) throw new NotFoundException(`invalid email or password`)
        return { accessToken: this._jwt.sign({ userId: user.id, username: user.username }) }
    }

    async logOut() { }
}
