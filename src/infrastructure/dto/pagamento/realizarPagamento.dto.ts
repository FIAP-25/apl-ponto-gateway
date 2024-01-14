import { AutoMap } from '@automapper/classes';

export class RealizarPagamentoOutput {
    @AutoMap()
    id: string;

    @AutoMap()
    notaFiscal: string;
}
