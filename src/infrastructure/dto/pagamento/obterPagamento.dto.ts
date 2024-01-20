import { AutoMap } from '@automapper/classes';

export class ObterPagamentoOutput {
    @AutoMap()
    id?: string;

    @AutoMap()
    pedidoId: string;

    @AutoMap()
    notaFiscal: string;

    @AutoMap()
    pagamentoStatus: string;
}
