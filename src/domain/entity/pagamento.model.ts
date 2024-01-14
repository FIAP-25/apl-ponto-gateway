import { AutoMap } from '@automapper/classes';
import { ObjectId } from 'typeorm';

export class Pagamento {
    @AutoMap()
    id?: ObjectId | string;

    @AutoMap()
    pedidoId: string;

    @AutoMap()
    notaFiscal: string;

    @AutoMap()
    pagamentoStatus: string;
}
