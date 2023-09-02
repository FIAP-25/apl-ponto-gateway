import { AutoMap } from '@automapper/classes';

export class PedidoStatus {
    @AutoMap()
    tag: string;

    @AutoMap()
    descricao: string;
}
