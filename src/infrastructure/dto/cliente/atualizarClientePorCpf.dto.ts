import { AutoMap } from '@automapper/classes';

export class AtualizarClientePorCpfInput {
    cpf?: string;

    @AutoMap()
    email: string;

    @AutoMap()
    nomeCompleto: string;
}

export class AtualizarClientePorCpfOutput {
    @AutoMap()
    cpf: string;

    @AutoMap()
    email: string;

    @AutoMap()
    nomeCompleto: string;
}
