import { Response } from "express"
import { AccessToken } from "./auth.type"
import { CreateAuthDto } from "./dto/create-auth.dto"
import { LoginAuthDto } from "./dto/login-auth.dto"

export type MaybePromise<T> = T | Promise<T>
export interface IAuth {
    signIn(payload: CreateAuthDto, res?: Response): MaybePromise<unknown>
    logIn(payload: LoginAuthDto, res?: Response): MaybePromise<unknown>
    logOut(): Promise<void>
}