import { AutoMap } from '@automapper/classes';

export class ObterStatusPagamentoOutput {
    @AutoMap()
    id: string;

    @AutoMap()
    pagamentoStatus: string;
}
