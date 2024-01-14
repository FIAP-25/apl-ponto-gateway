import { AutoMap } from '@automapper/classes';

export class RealizarPagamentoOutput {
    @AutoMap()
    id?: string;

    @AutoMap()
    pedidoId: string;

    @AutoMap()
    notaFiscal: string;

    @AutoMap()
    pagamentoStatus: string;
}
