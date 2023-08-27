import { mapper } from '@/application/mapper/base.mapper';
import { Categoria } from '@/domain/entity/categoria.model';
import { ErroNegocio } from '@/domain/exception/erro.module';
import { CategoriaRepository } from '@/infrastructure/repository/categoria/categoria.repository';
import { AutoMap } from '@automapper/classes';
import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';

class Input {
  @AutoMap()
  descricao: string;
}

class Output {
  @AutoMap()
  id: string;

  @AutoMap()
  descricao: string;
}

createMap(mapper, Input, Categoria);
createMap(mapper, Categoria, Output);

@Injectable()
export class CategoriaUseCase {
  constructor(private categoriaRepository: CategoriaRepository) {}

  async adicionarCategoria(input: Input): Promise<Output> {
    const categoria: Categoria = mapper.map(input, Input, Categoria);

    categoria.validarCategoria();

    const categoriaAdicionada = await this.categoriaRepository.save(categoria);

    return mapper.map(categoriaAdicionada, Categoria, Output);
  }

  async removerCategoriaPorId(id: string): Promise<void> {
    await this.categoriaRepository.remove(id);
  }

  async atualizarCategoriaPorId(input: Input): Promise<Output> {
    const categoria: Categoria = mapper.map(input, Input, Categoria);

    categoria.validarCategoria();

    const categoriaExiste = await this.categoriaRepository.findById(
      categoria.id,
    );

    if (!categoriaExiste) {
      throw new ErroNegocio('cliente-nao-cadastrado');
    }

    categoria.id = categoriaExiste.id;
    const categoriaAtualizada = await this.categoriaRepository.save(categoria);

    return mapper.map(categoriaAtualizada, Categoria, Output);
  }

  async obterCategoriaPorId(id: string): Promise<Output> {
    const categoria = await this.categoriaRepository.findById(id);

    if (!categoria) {
      throw new ErroNegocio('cliente-nao-cadastrado');
    }

    return mapper.map(categoria, Categoria, Output);
  }

  async obterCategorias(): Promise<Output[]> {
    const categorias = await this.categoriaRepository.find();

    return mapper.mapArray(categorias, Categoria, Output);
  }
}
