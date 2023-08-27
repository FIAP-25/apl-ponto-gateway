import { mapper } from '@/application/mapper/base.mapper';
import { Categoria } from '@/domain/entity/categoria.model';
import { Cliente } from '@/domain/entity/cliente.model';
import { ErroNegocio } from '@/domain/exception/erro.module';
import { CategoriaService } from '@/infrastructure/repository/categoria/categoria.service';
import { ClienteService } from '@/infrastructure/repository/cliente/cliente.service';
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
  constructor(private categoriaService: CategoriaService) {}

  async adicionarCategoria(input: Input): Promise<Output> {
    const categoria: Categoria = mapper.map(input, Input, Categoria);

    categoria.validarCategoria();

    const categoriaAdicionada = await this.categoriaService.save(categoria);

    return mapper.map(categoriaAdicionada, Categoria, Output);
  }

  async removerCategoriaPorId(id: string): Promise<void> {
    await this.categoriaService.remove(id);
  }

  async atualizarCategoriaPorId(input: Input): Promise<Output> {
    const categoria: Categoria = mapper.map(input, Input, Categoria);

    categoria.validarCategoria();

    const categoriaExiste = await this.categoriaService.findById(categoria.id);

    if (!categoriaExiste) {
      throw new ErroNegocio('cliente-nao-cadastrado');
    }

    categoria.id = categoriaExiste.id;
    const categoriaAtualizada = await this.categoriaService.save(categoria);

    return mapper.map(categoriaAtualizada, Categoria, Output);
  }

  async obterCategoriaPorId(id: string): Promise<Output> {
    const categoria = await this.categoriaService.findById(id);

    if (!categoria) {
      throw new ErroNegocio('cliente-nao-cadastrado');
    }

    return mapper.map(categoria, Categoria, Output);
  }

  async obterCategorias(): Promise<Output[]> {
    const categorias = await this.categoriaService.find();

    return mapper.mapArray(categorias, Categoria, Output);
  }
}
