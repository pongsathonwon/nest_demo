import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAuthDto implements Prisma.UsersCreateInput {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    @IsString()
    @MinLength(8)
    readonly password: string;
    @IsString()
    @IsNotEmpty()
    readonly username: string;
}