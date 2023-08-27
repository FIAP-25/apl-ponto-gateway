import { mapper } from '@/application/mapper/base.mapper';
import { Cliente } from '@/domain/entity/cliente.model';
import { Pedido } from '@/domain/entity/pedido.model';
import { IPedidoService } from '@/domain/port/repository/pedido.interface';
import { ClienteEntity } from '@/infrastructure/entity/cliente.entity';
import { PedidoEntity } from '@/infrastructure/entity/pedido.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class PedidoService implements IPedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private pedidoRepositoy: Repository<PedidoEntity>,
  ) {}

  async find(): Promise<Pedido[]> {
    const categoria = await this.pedidoRepositoy.find();
    return mapper.mapArray(categoria, PedidoEntity, Pedido);
  }

  async findById(id: string): Promise<Pedido> {
    const categorias = await this.pedidoRepositoy.findOneBy({ id: id });
    return mapper.map(categorias, PedidoEntity, Pedido);
  }

  async save(pedido: Pedido): Promise<Pedido> {
    const resultado = await this.pedidoRepositoy.save(pedido);
    return resultado;
  }

  async saveMany(pedido: Pedido[]): Promise<Pedido[]> {
    const resultado = await this.pedidoRepositoy.save(pedido);
    return resultado;
  }

  async removeById(id: string): Promise<void> {
    await this.pedidoRepositoy.delete(id);
  }
}
