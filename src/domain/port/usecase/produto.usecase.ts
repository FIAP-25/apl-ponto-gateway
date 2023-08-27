import { mapper } from '@/application/mapper/base.mapper';
import { Produto } from '@/domain/entity/produto.model';
import { ErroNegocio } from '@/domain/exception/erro.module';
import {
  AdicionarProdutoInput,
  AdicionarProdutoOutput,
} from '@/infrastructure/dto/produto/adicionarProduto.dto';
import {
  AtualizarProdutoInput,
  AtualizarProdutoOutput,
} from '@/infrastructure/dto/produto/atualizarProduto.dto';
import { ObterProdutoPorCategoriaOutput } from '@/infrastructure/dto/produto/obterProdutoPorCategoria.dto';
import { ObterProdutoPorIdOutput } from '@/infrastructure/dto/produto/obterProdutoPorId.dto';
import { ObterProdutosOutput } from '@/infrastructure/dto/produto/obterProdutos.dto';
import { CategoriaService } from '@/infrastructure/repository/categoria/categoria.service';
import { ProdutoService } from '@/infrastructure/repository/produto/produto.service';
import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';

createMap(mapper, AdicionarProdutoInput, Produto);
createMap(mapper, Produto, AdicionarProdutoOutput);

@Injectable()
export class ProdutoUseCase {
  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
  ) {}

  async adicionarProduto(
    input: AdicionarProdutoInput,
  ): Promise<AdicionarProdutoOutput> {
    if (!input.categoriaId) {
      throw new ErroNegocio('produto-categoria-nao-existe');
    }

    const categoriaProduto = await this.categoriaService.findById(
      input.categoriaId,
    );

    if (!categoriaProduto) {
      throw new ErroNegocio('produto-categoria-nao-existe');
    }

    const produto: Produto = mapper.map(input, AdicionarProdutoInput, Produto);
    produto.categoria = categoriaProduto;

    produto.validarProduto();

    const produtoAdicionado = await this.produtoService.save(produto);

    return mapper.map(produtoAdicionado, Produto, AdicionarProdutoOutput);
  }

  async removerProdutoPorId(id: string): Promise<void> {
    await this.produtoService.remove(id);
  }

  async atualizarProdutoPorId(
    input: AtualizarProdutoInput,
  ): Promise<AtualizarProdutoOutput> {
    if (!input.categoriaId) {
      throw new ErroNegocio('produto-categoria-nao-existe');
    }

    const categoriaProduto = await this.categoriaService.findById(
      input.categoriaId,
    );

    if (!categoriaProduto) {
      throw new ErroNegocio('produto-categoria-nao-existe');
    }

    const produto: Produto = mapper.map(input, AtualizarProdutoInput, Produto);
    produto.categoria = categoriaProduto;

    produto.validarProduto();

    const produtoAtualizado = await this.produtoService.save(produto);

    return mapper.map(produtoAtualizado, Produto, AtualizarProdutoOutput);
  }

  async obterProdutoPorId(id: string): Promise<ObterProdutoPorIdOutput> {
    const produto = await this.produtoService.findById(id);

    if (!produto) {
      throw new ErroNegocio('produto-nao-existe');
    }

    return mapper.map(produto, Produto, ObterProdutoPorIdOutput);
  }

  async obterProdutos(): Promise<ObterProdutosOutput[]> {
    const produtos = await this.produtoService.find();

    return mapper.mapArray(produtos, Produto, ObterProdutosOutput);
  }

  async obterProdutosPorCategoria(
    id: string,
  ): Promise<ObterProdutoPorCategoriaOutput[]> {
    const produtos = await this.produtoService.findBy({
      categoria: {
        id: id,
      },
    });

    return mapper.mapArray(produtos, Produto, ObterProdutoPorCategoriaOutput);
  }
}
