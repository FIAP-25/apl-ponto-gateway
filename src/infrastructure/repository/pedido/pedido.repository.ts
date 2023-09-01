import { mapper } from '@/application/mapper/base.mapper';
import { Cliente } from '@/domain/entity/cliente.model';
import { Pedido } from '@/domain/entity/pedido.model';
import { IPedidoRepository } from '@/domain/port/repository/pedido.interface';
import { ClienteEntity } from '@/infrastructure/entity/cliente.entity';
import { PedidoEntity } from '@/infrastructure/entity/pedido.entity';
import { createMap } from '@automapper/core';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';



createMap(mapper, PedidoEntity, Pedido);

@Injectable()
export class PedidoRepository implements IPedidoRepository {
  constructor(
    @InjectRepository(PedidoEntity)
    private pedidoRepositoy: Repository<PedidoEntity>,
  ) {}

  async find(): Promise<Pedido[]> {
    const pedido = await this.pedidoRepositoy.find();
    return pedido;
  }

  async findById(id: string): Promise<Pedido> {
    const pedido = await this.pedidoRepositoy.findOneBy({ id: id });
    return pedido;
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
