import { AutoMap } from '@automapper/classes';

export class AtualizarStatusPagamentoInput {
    @AutoMap()
    status: string;
}

export class AtualizarStatusPagamentoOutput {
    @AutoMap()
    id: string;

    @AutoMap()
    pagamentoStatus: string;
}
