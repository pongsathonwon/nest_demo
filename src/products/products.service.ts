import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProductsService {
  constructor(private _prisma: PrismaService) { }
  async create(createProductDto: CreateProductDto) {
    return await this._prisma.products.create({ data: createProductDto })
  }

  async findAll() {
    return await this._prisma.products.findMany()
  }

  async findOne(id: number) {
    const result = await this._prisma.products.findUnique({ where: { id } })
    if (!result) throw new NotFoundException()
    return result
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this._prisma.products.update({ where: { id }, data: updateProductDto });

  }

  async remove(id: number) {

    return await this._prisma.products.delete({ where: { id } })

  }
}
