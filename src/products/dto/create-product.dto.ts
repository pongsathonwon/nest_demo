import { Prisma } from "@prisma/client";
import { DecimalJsLike } from "@prisma/client/runtime/library";
import { IsString, IsNumber, IsNotEmpty } from "class-validator"

export class CreateProductDto implements Prisma.ProductsCreateInput {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    @IsNumber()
    @IsNotEmpty()
    readonly price: number | Prisma.Decimal | DecimalJsLike;
}
