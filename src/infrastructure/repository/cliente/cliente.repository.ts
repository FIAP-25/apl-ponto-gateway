import { mapper } from '@/application/mapper/base.mapper';
import { Cliente } from '@/domain/entity/cliente.model';
import { IClienteRepository } from '@/domain/port/repository/cliente.interface';
import { ClienteEntity } from '@/infrastructure/entity/cliente.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class ClienteRepository implements IClienteRepository {
  constructor(
    @InjectRepository(ClienteEntity)
    private repository: Repository<ClienteEntity>,
  ) {}

  async find(): Promise<Cliente[]> {
    const categoria = await this.repository.find();
    return mapper.mapArray(categoria, ClienteEntity, Cliente);
  }

  async findByCPF(cpf: string): Promise<Cliente> {
    const categorias = await this.repository.findOneBy({ cpf: cpf });
    return mapper.map(categorias, ClienteEntity, Cliente);
  }

  async save(cliente: Cliente): Promise<Cliente> {
    const resultado = await this.repository.save(cliente);
    return resultado;
  }

  async saveMany(cliente: Cliente[]): Promise<Cliente[]> {
    const resultado = await this.repository.save(cliente);
    return resultado;
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
