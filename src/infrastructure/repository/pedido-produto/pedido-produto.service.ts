import { mapper } from '@/application/mapper/base.mapper';
import { Cliente } from '@/domain/entity/cliente.model';
import { Pedido } from '@/domain/entity/pedido.model';
import { IPedidoProdutoService } from '@/domain/port/repository/pedido-produto.interface';
import { IPedidoService } from '@/domain/port/repository/pedido.interface';
import { ClienteEntity } from '@/infrastructure/entity/cliente.entity';
import { PedidoProdutoEntity } from '@/infrastructure/entity/pedido-produto.entity';
import { PedidoEntity } from '@/infrastructure/entity/pedido.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class PedidoProdutoService implements IPedidoProdutoService {
  constructor(
    @InjectRepository(PedidoProdutoEntity)
    private pedidoRepositoy: Repository<PedidoProdutoEntity>,
  ) {}

  async find(): Promise<Pedido[]> {
    const categoria = await this.pedidoRepositoy.find();
    return mapper.mapArray(categoria, PedidoProdutoEntity, Pedido);
  }

  async findById(id: string): Promise<Pedido> {
    const categorias = await this.pedidoRepositoy.findOneBy({ id: id });
    return mapper.map(categorias, PedidoProdutoEntity, Pedido);
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
