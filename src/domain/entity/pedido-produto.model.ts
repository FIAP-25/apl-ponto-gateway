import { AutoMap } from '@automapper/classes';
import { Pedido } from './pedido.model';
import { Produto } from './produto.model';

export class PedidoProduto {
    @AutoMap()
    id: string;

    @AutoMap()
    quantidade: number;

    @AutoMap()
    pedido?: Pedido;

    @AutoMap()
    produto: Produto;
}
