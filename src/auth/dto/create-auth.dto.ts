import { Prisma } from "@prisma/client";

export class CreateAuthDto implements Prisma.UsersCreateInput {
    readonly email: string;
    readonly password: string;
    readonly username: string;
}