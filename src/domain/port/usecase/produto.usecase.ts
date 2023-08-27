import { mapper } from '@/application/mapper/base.mapper';
import { Categoria } from '@/domain/entity/categoria.model';
import { Produto } from '@/domain/entity/produto.model';
import { ErroNegocio } from '@/domain/exception/erro.module';
import { CategoriaService } from '@/infrastructure/repository/categoria/categoria.service';
import { ProdutoService } from '@/infrastructure/repository/produto/produto.service';
import { AutoMap } from '@automapper/classes';
import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';

class Input {
  @AutoMap()
  descricao: string;

  @AutoMap()
  nome: string;

  categoriaId: string;

  @AutoMap()
  preco: number;
}

class Output {
  @AutoMap()
  id: string;

  @AutoMap()
  descricao: string;

  @AutoMap()
  nome: string;

  @AutoMap()
  categoria: Categoria;

  @AutoMap()
  preco: number;
}

createMap(mapper, Input, Produto);
createMap(mapper, Produto, Output);

@Injectable()
export class ProdutoUseCase {
  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
  ) {}

  async adicionarProduto(input: Input): Promise<Output> {
    if (!input.categoriaId) {
      throw new ErroNegocio('produto-categoria-nao-existe');
    }

    const categoriaProduto = await this.categoriaService.findById(
      input.categoriaId,
    );

    if (!categoriaProduto) {
      throw new ErroNegocio('produto-categoria-nao-existe');
    }

    const produto: Produto = mapper.map(input, Input, Produto);
    produto.categoria = categoriaProduto;

    produto.validarProduto();

    const produtoAdicionado = await this.produtoService.save(produto);

    return mapper.map(produtoAdicionado, Produto, Output);
  }

  async removerProdutoPorId(id: string): Promise<void> {
    await this.produtoService.remove(id);
  }

  async atualizarProdutoPorId(input: Input): Promise<Output> {
    if (!input.categoriaId) {
      throw new ErroNegocio('produto-categoria-nao-existe');
    }

    const categoriaProduto = await this.categoriaService.findById(
      input.categoriaId,
    );

    if (!categoriaProduto) {
      throw new ErroNegocio('produto-categoria-nao-existe');
    }

    const produto: Produto = mapper.map(input, Input, Produto);
    produto.categoria = categoriaProduto;

    produto.validarProduto();

    const produtoAtualizado = await this.produtoService.save(produto);

    return mapper.map(produtoAtualizado, Produto, Output);
  }

  async obterProdutoPorId(id: string): Promise<Output> {
    const produto = await this.produtoService.findById(id);

    if (!produto) {
      throw new ErroNegocio('produto-nao-existe');
    }

    return mapper.map(produto, Produto, Output);
  }

  async obterProdutos(): Promise<Output[]> {
    const produtos = await this.produtoService.find();

    return mapper.mapArray(produtos, Produto, Output);
  }

  async obterProdutosPorCategoria(id: string): Promise<Output[]> {
    const produtos = await this.produtoService.findBy({
      categoria: {
        id: id,
      },
    });

    return mapper.mapArray(produtos, Produto, Output);
  }
}
