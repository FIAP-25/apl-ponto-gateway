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
        private pedidoRepositoy: Repository<PedidoStatusEntity>
    ) {}

    async find(): Promise<PedidoStatus[]> {
        const pedido = await this.pedidoRepositoy.find();
        return mapper.mapArray(pedido, PedidoStatusEntity, PedidoStatus);
    }

    async findByTag(tag: string): Promise<PedidoStatus> {
        const pedido = await this.pedidoRepositoy.findOneBy({ tag: tag });

        return mapper.map(pedido, PedidoStatusEntity, PedidoStatus);
    }

    async removeById(id: string): Promise<void> {
        await this.pedidoRepositoy.delete(id);
    }
}
