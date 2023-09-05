import { Pedido } from '@/domain/entity/pedido.model';

export abstract class IPedidoRepository {
    abstract find(): Promise<Pedido[]>;
    abstract findById(id: string): Promise<Pedido>;
    abstract save(pedido: Pedido): Promise<Pedido>;
    abstract removeById(id: string): Promise<void>;
}
