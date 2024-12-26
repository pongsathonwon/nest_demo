import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { Token } from "./auth.type";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private _auth: AuthService, private _config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _config.get("SECRET")
        })
    }

    async validate(payload: Token) {
        const user = await this._auth.checkAuth(payload.userId)
        if (!user) throw new UnauthorizedException()
        return user
    }
}