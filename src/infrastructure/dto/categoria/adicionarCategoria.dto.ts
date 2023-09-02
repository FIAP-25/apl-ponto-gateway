import { AutoMap } from '@automapper/classes';

export class AdicionarCategoriaInput {
    @AutoMap()
    descricao: string;
}

export class AdicionarCategoriaOutput {
    @AutoMap()
    id: string;

    @AutoMap()
    descricao: string;
}
