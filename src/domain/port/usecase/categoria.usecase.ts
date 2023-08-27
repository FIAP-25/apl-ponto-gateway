import { mapper } from '@/application/mapper/base.mapper';
import { Categoria } from '@/domain/entity/categoria.model';
import { ErroNegocio } from '@/domain/exception/erro.module';
import {
  AdicionarCategoriaInput,
  AdicionarCategoriaOutput,
} from '@/infrastructure/dto/categoria/adicionarCategoria.dto';
import {
  AtualizarCategoriaPorIdInput,
  AtualizarCategoriaPorIdOutput,
} from '@/infrastructure/dto/categoria/atualizarCategoriaPorId.dto';
import { ObterCategoriaPorIdOutput } from '@/infrastructure/dto/categoria/obterCategoriaPorId.dto';
import { ObterCategoriasOutput } from '@/infrastructure/dto/categoria/obterCategorias.dto';
import { CategoriaRepository } from '@/infrastructure/repository/categoria/categoria.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriaUseCase {
  constructor(private categoriaRepository: CategoriaRepository) {}

  async adicionarCategoria(
    input: AdicionarCategoriaInput,
  ): Promise<AdicionarCategoriaOutput> {
    const categoria: Categoria = mapper.map(
      input,
      AdicionarCategoriaInput,
      Categoria,
    );

    categoria.validarCategoria();

    const categoriaAdicionada = await this.categoriaRepository.save(categoria);

    return mapper.map(categoriaAdicionada, Categoria, AdicionarCategoriaOutput);
  }

  async removerCategoriaPorId(id: string): Promise<void> {
    await this.categoriaRepository.remove(id);
  }

  async atualizarCategoriaPorId(
    id: string,
    input: AtualizarCategoriaPorIdInput,
  ): Promise<AtualizarCategoriaPorIdOutput> {
    const categoria: Categoria = mapper.map(
      input,
      AtualizarCategoriaPorIdInput,
      Categoria,
    );
    categoria.id = id;

    categoria.validarCategoria();

    const categoriaExiste = await this.categoriaRepository.findById(
      categoria.id,
    );

    if (!categoriaExiste) {
      throw new ErroNegocio('cliente-nao-cadastrado');
    }

    categoria.id = categoriaExiste.id;
    const categoriaAtualizada = await this.categoriaRepository.save(categoria);

    return mapper.map(
      categoriaAtualizada,
      Categoria,
      AtualizarCategoriaPorIdOutput,
    );
  }

  async obterCategoriaPorId(id: string): Promise<ObterCategoriaPorIdOutput> {
    const categoria = await this.categoriaRepository.findById(id);

    if (!categoria) {
      throw new ErroNegocio('cliente-nao-cadastrado');
    }

    return mapper.map(categoria, Categoria, ObterCategoriaPorIdOutput);
  }

  async obterCategorias(): Promise<ObterCategoriasOutput[]> {
    const categorias = await this.categoriaRepository.find();

    return mapper.mapArray(categorias, Categoria, ObterCategoriasOutput);
  }
}
