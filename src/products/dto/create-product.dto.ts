import { Prisma } from "@prisma/client";
import { DecimalJsLike } from "@prisma/client/runtime/library";

export class CreateProductDto implements Prisma.ProductsCreateInput {
    readonly name: string;
    readonly price: number | Prisma.Decimal | DecimalJsLike;
}
