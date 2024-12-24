import { Products } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class Product implements Products {
    id: number;
    name: string;
    price: Decimal;
    createAt: Date;
}
