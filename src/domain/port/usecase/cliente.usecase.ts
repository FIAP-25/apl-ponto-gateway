import { mapper } from '@/application/mapper/base.mapper';
import { Cliente } from '@/domain/entity/cliente.model';
import { ErroNegocio } from '@/domain/exception/erro.module';
import {
  AdicionarClienteInput,
  AdicionarClienteOutput,
} from '@/infrastructure/dto/cliente/adicionarCliente.dto';
import {
  AtualizarClientePorCpfInput,
  AtualizarClientePorCpfOutput,
} from '@/infrastructure/dto/cliente/atualizarClientePorCpf.dto';
import { ObterClientePorCpfOutput } from '@/infrastructure/dto/cliente/obterClientePorCpf.dto';
import { ObterClientesOutput } from '@/infrastructure/dto/cliente/obterClientes.dto';
import { ClienteService } from '@/infrastructure/repository/cliente/cliente.service';
import { AutoMap } from '@automapper/classes';
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

@Injectable()
export class ClienteUseCase {
  constructor(private clienteService: ClienteService) {}

  async adicionarCliente(
    input: AdicionarClienteInput,
  ): Promise<AdicionarClienteOutput> {
    const cliente: Cliente = mapper.map(input, AdicionarClienteInput, Cliente);

    cliente.validarClienteAdicionar();

    const clienteExiste = await this.clienteService.findByCPF(cliente.cpf);

    if (clienteExiste) {
      throw new ErroNegocio('cliente-cpf-cadastrado');
    }

    const clienteAdicionado = await this.clienteService.save(cliente);
    return mapper.map(clienteAdicionado, Cliente, AdicionarClienteOutput);
  }

  async removerClientePorCpf(cpf: string): Promise<void> {
    await this.clienteService.remove(cpf);
  }

  async atualizarClientePorCpf(
    input: AtualizarClientePorCpfInput,
  ): Promise<AtualizarClientePorCpfOutput> {
    const cliente: Cliente = mapper.map(
      input,
      AtualizarClientePorCpfInput,
      Cliente,
    );

    cliente.validarClienteAtualizar();

    const clienteExiste = await this.clienteService.findByCPF(cliente.cpf);

    if (!clienteExiste) {
      throw new ErroNegocio('cliente-nao-cadastrado');
    }

    cliente.cpf = clienteExiste.cpf;
    const produtoAtualizado = await this.clienteService.save(cliente);

    return mapper.map(produtoAtualizado, Cliente, AtualizarClientePorCpfOutput);
  }

  async obterClientePorCpf(cpf: string): Promise<ObterClientePorCpfOutput> {
    const cliente = await this.clienteService.findByCPF(cpf);

    if (!cliente) {
      throw new ErroNegocio('cliente-nao-cadastrado');
    }

    return mapper.map(cliente, Cliente, ObterClientePorCpfOutput);
  }

  async obterClientes(): Promise<ObterClientesOutput[]> {
    const cliente = await this.clienteService.find();

    return mapper.mapArray(cliente, Cliente, ObterClientesOutput);
  }
}
