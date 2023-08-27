import { created, noContent, ok } from '@/application/helper/http.helper';
import { CategoriaUseCase } from '@/domain/port/usecase/categoria.usecase';
import { ClienteUseCase } from '@/domain/port/usecase/cliente.usecase';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('api/categorias')
export class CategoriaController {
  constructor(private categoriaUseCase: CategoriaUseCase) {}

  @Post()
  async adicionarCategoria(@Body() body: any, @Res() res: Response) {
    const categoria = body;

    const categoriaAdicionada = await this.categoriaUseCase.adicionarCategoria(
      categoria,
    );

    return created(categoriaAdicionada, res);
  }

  @Delete(':id')
  async removerCategoriaPorId(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    await this.categoriaUseCase.removerCategoriaPorId(id);

    return noContent(res);
  }

  @Put(':id')
  async atualizarCategoriaPorId(
    @Param('id') id: string,
    @Body() body: any,
    @Res() res: Response,
  ): Promise<any> {
    const categoria = body;

    categoria.id = id;

    const categoriaAtualizada =
      await this.categoriaUseCase.atualizarCategoriaPorId(categoria);

    return ok(categoriaAtualizada, res);
  }

  @Get()
  async obterCategorias(@Res() res: Response): Promise<any> {
    const categorias = await this.categoriaUseCase.obterCategorias();

    return ok(categorias, res);
  }

  @Get(':id')
  async obterCategoriaPorId(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const categoria = await this.categoriaUseCase.obterCategoriaPorId(id);

    return ok(categoria, res);
  }
}
