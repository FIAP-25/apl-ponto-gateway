import { mapper } from '@/application/mapper/base.mapper';
import { IPedidoStatusRepository } from '@/domain/contract/repository/pedido-status.interface';
import { PedidoStatus } from '@/domain/entity/pedido-status.model';
import { PedidoStatusEntity } from '@/infrastructure/entity/pedido-status.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class PedidoStatusRepository implements IPedidoStatusRepository {
    constructor(
        @InjectRepository(PedidoStatusEntity)
        private repository: Repository<PedidoStatusEntity>
    ) {}

    async find(): Promise<PedidoStatus[]> {
        const pedido = await this.repository.find();
        return mapper.mapArray(pedido, PedidoStatusEntity, PedidoStatus);
    }

    async findByTag(tag: string): Promise<PedidoStatus> {
        const pedido = await this.repository.findOneBy({ tag: tag });

        return mapper.map(pedido, PedidoStatusEntity, PedidoStatus);
    }

    async saveMany(pedidoStatus: PedidoStatus[]): Promise<PedidoStatus[]> {
        const resultado = await this.repository.save(pedidoStatus);

        return resultado;
    }

    async removeById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async initialPopulate(): Promise<void> {
        const pedidoStatus: PedidoStatus[] = [
            { tag: 'pedido_recebido', descricao: 'Pedido recebido.' },
            { tag: 'pedido_preparacao', descricao: 'Pedido em preparação.' },
            { tag: 'pedido_pronto', descricao: 'Pedido pronto.' },
            { tag: 'pedido_finalizado', descricao: 'Pedido finalizado.' }
        ];

        await this.saveMany(pedidoStatus)
            .then(() => {
                console.log('[Database]: Status iniciais dos pedidos incluídos com sucesso!');
            })
            .catch((error) => {
                console.log('[Database]: Status iniciais dos pedidos já existem! - ', error.code);
            });
    }
}
