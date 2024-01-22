import { AutoMap } from '@automapper/classes';
import { PedidoStatus } from './pedido-status.model';
import { PedidoProduto } from './pedido-produto';

export class Pedido {
    @AutoMap()
    id: string;

    @AutoMap()
    status: PedidoStatus;

    @AutoMap()
    valorTotal: number;

    @AutoMap()
    pedidoProdutos: PedidoProduto[];

    @AutoMap()
    dataCadastro: Date;

    @AutoMap()
    dataAtualizacao: Date;

    @AutoMap()
    pagamentoStatus: string;
}
