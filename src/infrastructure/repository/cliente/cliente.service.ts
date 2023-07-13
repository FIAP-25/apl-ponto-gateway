import { mapper } from '@/application/mapper/base.mapper';
import { Cliente } from '@/domain/entity/cliente.model';
import { IClienteService } from '@/domain/port/repository/cliente.interface';
import { ClienteEntity } from '@/infrastructure/entity/cliente.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class ClienteService implements IClienteService {
  constructor(
    @InjectRepository(ClienteEntity)
    private clienteRepository: Repository<ClienteEntity>,
  ) {}

  async find(): Promise<Cliente[]> {
    const categoria = await this.clienteRepository.find();
    return mapper.mapArray(categoria, ClienteEntity, Cliente);
  }

  async findByCPF(cpf: string): Promise<Cliente> {
    const categorias = await this.clienteRepository.findOneBy({ cpf: cpf });
    return mapper.map(categorias, ClienteEntity, Cliente);
  }

  async save(cliente: Cliente): Promise<Cliente> {
    const resultado = await this.clienteRepository.save(cliente);
    return resultado;
  }

  async saveMany(cliente: Cliente[]): Promise<Cliente[]> {
    const resultado = await this.clienteRepository.save(cliente);
    return resultado;
  }

  async remove(id: string): Promise<void> {
    await this.clienteRepository.delete(id);
  }
}
