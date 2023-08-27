import { created, noContent, ok } from '@/application/helper/http.helper';
import { CategoriaUseCase } from '@/domain/port/usecase/categoria.usecase';
import { ProdutoUseCase } from '@/domain/port/usecase/produto.usecase';
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

@Controller('api/produtos')
export class ProdutoController {
  constructor(private produtoUseCase: ProdutoUseCase) {}

  @Post()
  async adicionarProduto(@Body() body: any, @Res() res: Response) {
    const produto = body;

    const produtoAdicionado = await this.produtoUseCase.adicionarProduto(
      produto,
    );

    return created(produtoAdicionado, res);
  }

  @Delete(':id')
  async removerProdutoPorId(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    await this.produtoUseCase.removerProdutoPorId(id);

    return noContent(res);
  }

  @Put(':id')
  async atualizarProdutoPorId(
    @Param('id') id: string,
    @Body() body: any,
    @Res() res: Response,
  ): Promise<any> {
    const produto = body;

    produto.id = id;

    const produtoAtualizado = await this.produtoUseCase.atualizarProdutoPorId(
      produto,
    );

    return ok(produtoAtualizado, res);
  }

  @Get()
  async obterProdutos(@Res() res: Response): Promise<any> {
    const produtos = await this.produtoUseCase.obterProdutos();

    return ok(produtos, res);
  }

  @Get(':id')
  async obterProdutoPorId(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const produto = await this.produtoUseCase.obterProdutoPorId(id);

    return ok(produto, res);
  }

  @Get()
  async obterProdutosPorCategoria(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const produtos = await this.produtoUseCase.obterProdutosPorCategoria(id);

    return ok(produtos, res);
  }
}
