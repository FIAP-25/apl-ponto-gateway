import { PedidoStatus } from '@/domain/entity/pedido-status.model';

export abstract class IPedidoStatusRepository {
    abstract find(): Promise<PedidoStatus[]>;
    abstract findByTag(tag: string): Promise<PedidoStatus>;
    // save(pedidoStatus: PedidoStatus): Promise<PedidoStatus>;
    abstract saveMany(pedidoStatus: PedidoStatus[]): Promise<PedidoStatus[]>;
    // removeByTag(tag: string): Promise<void>;

    abstract initialPopulate(): Promise<void>;
}
