import { AutoMap } from '@automapper/classes';

export class Pagamento {
    @AutoMap()
    id: string;

    @AutoMap()
    pedidoId: string;

    @AutoMap()
    notaFiscal: string;

    @AutoMap()
    pagamentoStatus: string;
}
