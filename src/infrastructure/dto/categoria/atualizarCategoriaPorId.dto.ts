import { AutoMap } from '@automapper/classes';

export class AtualizarCategoriaPorIdInput {
    @AutoMap()
    descricao: string;
}

export class AtualizarCategoriaPorIdOutput {
    @AutoMap()
    id: string;

    @AutoMap()
    descricao: string;
}
