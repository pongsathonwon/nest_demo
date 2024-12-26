import { Response } from "express"
import { AccessToken } from "./auth.type"
import { CreateAuthDto } from "./dto/create-auth.dto"
import { LoginAuthDto } from "./dto/login-auth.dto"

export type MaybePromise<T> = T | Promise<T>
export interface Signin {
    signin(...arg: unknown[]): MaybePromise<unknown>
}

export interface Login {
    login(...arg: unknown[]): MaybePromise<unknown>
}

export interface Logout {
    logout(...arg: unknown[]): MaybePromise<unknown>
}