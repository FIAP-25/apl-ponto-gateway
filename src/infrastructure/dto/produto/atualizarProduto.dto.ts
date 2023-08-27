import { Categoria } from '@/domain/entity/categoria.model';
import { AutoMap } from '@automapper/classes';

export class AtualizarProdutoInput {
  @AutoMap()
  id: string;

  @AutoMap()
  descricao: string;

  categoriaId: string;

  @AutoMap()
  preco: number;
}

export class AtualizarProdutoOutput {
  @AutoMap()
  id: string;

  @AutoMap()
  descricao: string;

  @AutoMap()
  categoria: Categoria;

  @AutoMap()
  preco: number;
}
