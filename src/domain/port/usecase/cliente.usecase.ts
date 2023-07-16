import { mapper } from '@/application/mapper/base.mapper';
import { Cliente } from '@/domain/entity/cliente.model';
import { ErroNegocio } from '@/domain/exception/erro.module';
import { ClienteService } from '@/infrastructure/repository/cliente/cliente.service';
import { AutoMap } from '@automapper/classes';
import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';

export class Input {
  @AutoMap()
  cpf: string;

  @AutoMap()
  email: string;

  @AutoMap()
  nomeCompleto: string;
}

export class Output {
  @AutoMap()
  cpf: string;

  @AutoMap()
  email: string;

  @AutoMap()
  nomeCompleto: string;
}

createMap(mapper, Input, Cliente);
createMap(mapper, Cliente, Output);

@Injectable()
export class ClienteUseCase {
  constructor(private clienteService: ClienteService) {}

  async adicionarCliente(input: Input): Promise<Output> {
    const cliente: Cliente = mapper.map(input, Input, Cliente);

    cliente.validarClienteAdicionar();

    const clienteExiste = await this.clienteService.findByCPF(cliente.cpf);

    if (clienteExiste) {
      throw new ErroNegocio('cliente-cpf-cadastrado');
    }

    const clienteAdicionado = await this.clienteService.save(cliente);
    return mapper.map(clienteAdicionado, Cliente, Output);
  }

  async removerClientePorCPF(cpf: string): Promise<void> {
    await this.clienteService.remove(cpf);
  }

  async atualizarClientePorCPF(input: Input): Promise<Output> {
    const cliente: Cliente = mapper.map(input, Input, Cliente);

    cliente.validarClienteAtualizar();

    const clienteExiste = await this.clienteService.findByCPF(cliente.cpf);

    if (!clienteExiste) {
      throw new ErroNegocio('cliente-nao-cadastrado');
    }

    cliente.cpf = clienteExiste.cpf;
    const produtoAtualizado = await this.clienteService.save(cliente);

    return mapper.map(produtoAtualizado, Cliente, Output);
  }
}
