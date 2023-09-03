import { Categoria } from '@/domain/entity/categoria.model';
import { AutoMap } from '@automapper/classes';

export class AtualizarProdutoPorIdInput {
    @AutoMap()
    id: string;

    @AutoMap()
    descricao: string;

    categoriaId: string;

    @AutoMap()
    preco: number;
}

export class AtualizarProdutoPorIdOutput {
    @AutoMap()
    id: string;

    @AutoMap()
    descricao: string;

    @AutoMap()
    categoria: Categoria;

    @AutoMap()
    preco: number;
}
