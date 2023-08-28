import { mapper } from '@/application/mapper/base.mapper';
import { Cliente } from '@/domain/entity/cliente.model';
import { PedidoStatus } from '@/domain/entity/pedido-status.model';
import { Pedido } from '@/domain/entity/pedido.model';
import { IPedidoStatusRepository  } from '@/domain/port/repository/pedido-status.interface';
import { ClienteEntity } from '@/infrastructure/entity/cliente.entity';
import { PedidoProdutoEntity } from '@/infrastructure/entity/pedido-produto.entity';
import { PedidoStatusEntity } from '@/infrastructure/entity/pedido-status.entity';
import { PedidoEntity } from '@/infrastructure/entity/pedido.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class PedidoStatusRepository implements IPedidoStatusRepository {
  constructor(
    @InjectRepository(PedidoStatusEntity)
    private pedidoRepositoy: Repository<PedidoStatusEntity>,
  ) {}

  async find(): Promise<PedidoStatus[]> {
    const categoria = await this.pedidoRepositoy.find();
    return mapper.mapArray(categoria, PedidoStatusEntity, PedidoStatus);
  }

  async findByTag(tag: string):  Promise<PedidoStatus> {
    const categorias = await this.pedidoRepositoy.findOneBy({ tag: tag });
    return mapper.map(categorias, PedidoStatusEntity, PedidoStatus);
  }

  async removeById(id: string): Promise<void> {
    await this.pedidoRepositoy.delete(id);
  }
}
