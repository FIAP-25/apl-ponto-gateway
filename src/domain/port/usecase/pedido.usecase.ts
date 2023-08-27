import { mapper } from '@/application/mapper/base.mapper';
import { Cliente } from '@/domain/entity/cliente.model';
import { Pedido } from '@/domain/entity/pedido.model';
import { ErroNegocio } from '@/domain/exception/erro.module';
import { ClienteService } from '@/infrastructure/repository/cliente/cliente.service';
import { PedidoService } from '@/infrastructure/repository/pedido/pedido.service';
import { AutoMap } from '@automapper/classes';
import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Not } from 'typeorm';

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
export class PedidoUseCase {
  constructor(
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private pedidoStatusService: PedidoStatusService,
  ) {}

  async adicionarPedido(input: Input): Promise<Output> {
    const pedido: Pedido = mapper.map(input, Input, Pedido);
    pedido.pedidoProdutos = [];

    const pedidoProdutoQuantidadeInvalida = input.pedidoProdutos.some(
      (produto) => produto.quantidade <= 0,
    );
    if (pedidoProdutoQuantidadeInvalida) {
      throw new ErroNegocio('pedido-produto-quantidade-invalida');
    }

    const existeProdutoDuplicado = input.pedidoProdutos.some(
      (produto, index) =>
        input.pedidoProdutos.findIndex(
          (produtoEncontrado) =>
            produtoEncontrado.produtoId === produto.produtoId,
        ) !== index,
    );
    if (existeProdutoDuplicado) {
      throw new ErroNegocio('pedido-produto-duplicado');
    }

    if (input.clienteCPF) {
      const clientePedido = await this.clienteService.findByCPF(
        input.clienteCPF,
      );

      if (!clientePedido) {
        throw new ErroNegocio('cliente-nao-cadastrado');
      }

      pedido.cliente = clientePedido;
    }

    const pedidoStatus = await this.pedidoStatusService.findByTag('pedido_recebido');
    if (pedidoStatus) {
      pedido.status = pedidoStatus;
    }

    const produtos = await produtoRepository.find();

    input.pedidoProdutos.forEach((produto) => {
      const produtoEncontrado = produtos.find(
        (produtoEncontrado) => produtoEncontrado.id === produto.produtoId,
      );

      if (!produtoEncontrado) {
        throw new ErroNegocio('pedido-produto-nao-existe');
      }
    });

    pedido.valorTotal = input.pedidoProdutos
      .map((pedidoProduto) => {
        const produto = produtos.find(
          (produto) => produto.id === pedidoProduto.produtoId,
        );
        if (produto) {
          return produto?.preco * pedidoProduto.quantidade;
        }
        return 0;
      })
      .reduce((soma, preco) => soma + preco);

    const pedidoAdicionado = await pedidoRepository.save(pedido);

    const pedidoProduto = input.pedidoProdutos.map((pedidoProduto) => {
      const produto = produtos.find(
        (produto) => produto.id === pedidoProduto.produtoId,
      );
      if (produto) {
        return {
          pedido: { ...pedidoAdicionado },
          produto: produto,
          quantidade: pedidoProduto.quantidade,
        };
      }
    });

    if (pedidoProduto) {
      pedido.pedidoProdutos = pedidoProduto as PedidoProduto[];
    }

    const pedidoProdutoAdicionado = await pedidoProdutoRepository.saveMany(
      pedido.pedidoProdutos,
    );
    pedidoAdicionado.pedidoProdutos = pedidoProdutoAdicionado.map(
      (pedidoProduto) => {
        return {
          id: pedidoProduto.id,
          produto: pedidoProduto.produto,
          quantidade: pedidoProduto.quantidade,
        };
      },
    );

    return mapper.map(pedidoAdicionado, Pedido, Output);
  }

  async removerPedidoPorId(id: string): Promise<void> {
    await this.pedidoService.remove(id);
  }

  async atualizarPedidoStatusPorId(input: Input): Promise<Output> {
    const pedidoEncontrado = await this.pedidoService.findById(input.id);

    if (!pedidoEncontrado) {
        throw new ErroNegocio('pedido-nao-existe');
    }

    const pedidoStatusEncontrado = await this.pedidoStatusService.findByTag(input.statusTag);

    pedidoEncontrado.status = pedidoStatusEncontrado;

    const pedidoAtualizado = await this.pedidoService.save(pedidoEncontrado);

    return mapper.map(pedidoAtualizado, Pedido, Output);
  }

  async obterPedidoPorId(cpf: string): Promise<Output> {
    const pedido = await this.pedidoService.obterPedidoPorId(cpf);

    if (!pedido) {
      throw new ErroNegocio('cliente-nao-cadastrado');
    }

    return mapper.map(pedido, Pedido, Output);
  }

  async obterPedidos(): Promise<Output[]> {
    const pedido = await this.pedidoService.find();

    return mapper.mapArray(pedido, Pedido, Output);
  }

  async obterPedidosFila(): Promise<Output[]> {
    const pedidos = await this.pedidoService.findBy(
      {
          status: {
              tag: Not('pedido_finalizado')
          }
      },
      { dataCadastro: 'DESC' }
    );

    return mapper.mapArray(pedidos, Pedido, Output);
  }
  


}
