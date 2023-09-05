import { mapper } from '@/application/mapper/base.mapper';
import { Pedido } from '@/domain/entity/pedido.model';
import { IPedidoRepository } from '@/domain/contract/repository/pedido.interface';
import { PedidoEntity } from '@/infrastructure/entity/pedido.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class PedidoRepository implements IPedidoRepository {
    constructor(
        @InjectRepository(PedidoEntity)
        private pedidoRepositoy: Repository<PedidoEntity>
    ) {}

    async find(): Promise<Pedido[]> {
        const pedido = await this.pedidoRepositoy.find();
        return mapper.mapArray(pedido, PedidoEntity, Pedido);
    }

    async findById(id: string): Promise<Pedido> {
        const pedido = await this.pedidoRepositoy.findOneBy({ id: id });
        return mapper.map(pedido, PedidoEntity, Pedido);
    }

    async save(pedido: Pedido): Promise<Pedido> {
        const resultado = await this.pedidoRepositoy.save(pedido);
        return resultado;
    }

    async removeById(id: string): Promise<void> {
        await this.pedidoRepositoy.delete(id);
    }
}
