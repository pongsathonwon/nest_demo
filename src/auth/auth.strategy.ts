import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { Token } from "./auth.type";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private _auth: AuthService, private _config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req.cookies?.access_token]),
            ignoreExpiration: false,
            secretOrKey: _config.get("SECRET")
        })
    }

    async validate(payload: Token) {
        const user = await this._auth.checkAuth(payload.userId)
        if (!user) throw new UnauthorizedException()
        return user
    }
}