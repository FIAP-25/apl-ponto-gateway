import { PedidoStatus } from '@/domain/entity/pedido-status.model';
import { PedidoStatusEntity } from '@/infrastructure/entity/pedido-status.entity';

import { Repository } from 'typeorm';

export interface IPedidoStatusService {

    find(): Promise<PedidoStatus[]>;
    // findByTag(tag: string): Promise<PedidoStatus>;
    // save(pedidoStatus: PedidoStatus): Promise<PedidoStatus>;
    // saveMany(pedidoStatus: PedidoStatus[]): Promise<PedidoStatus[]>;
    // removeByTag(tag: string): Promise<void>;
}
