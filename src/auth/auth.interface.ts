import { AccessToken } from "./auth.type"
import { CreateAuthDto } from "./dto/create-auth.dto"
import { LoginAuthDto } from "./dto/login-auth.dto"
export interface IAuth {
    signIn(payload: CreateAuthDto): Promise<AccessToken<unknown>>
    logIn(payload: LoginAuthDto): Promise<AccessToken<unknown>>
    logOut(): Promise<void>
}