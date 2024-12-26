import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { SECRET } from "./auth.module";
import { Token } from "./auth.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private _auth: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: SECRET
        })
    }

    async validate(payload: Token) {
        const user = await this._auth.checkAuth(payload.userId)
        if (!user) throw new UnauthorizedException()
        return user
    }
}