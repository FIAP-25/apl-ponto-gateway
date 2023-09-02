import { Categoria } from '@/domain/entity/categoria.model';
import { AutoMap } from '@automapper/classes';

export class AdicionarProdutoInput {
    @AutoMap()
    descricao: string;

    @AutoMap()
    nome: string;

    categoriaId: string;

    @AutoMap()
    preco: number;
}

export class AdicionarProdutoOutput {
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
