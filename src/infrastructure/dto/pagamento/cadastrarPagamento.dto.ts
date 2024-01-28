import { AutoMap } from '@automapper/classes';

export class CadastrarPagamentoOutput {
    @AutoMap()
    id?: string;

    @AutoMap()
    pedidoId: string;

    @AutoMap()
    notaFiscal: string;

    @AutoMap()
    pagamentoStatus: string;
}
