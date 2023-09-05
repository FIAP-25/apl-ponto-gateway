import { PedidoProduto } from '@/domain/entity/pedido-produto.model';
import { Pedido } from '@/domain/entity/pedido.model';

export abstract class IPedidoProdutoRepository {
    abstract find(): Promise<Pedido[]>;
    abstract findById(id: string): Promise<Pedido>;
    abstract save(pedido: Pedido): Promise<Pedido>;
    abstract saveMany(pedidos: PedidoProduto[]): Promise<PedidoProduto[]>;
    abstract removeById(id: string): Promise<void>;
}
