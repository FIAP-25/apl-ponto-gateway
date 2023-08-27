import { mapper } from '@/application/mapper/base.mapper';
import { Cliente } from '@/domain/entity/cliente.model';
import { PedidoProduto } from '@/domain/entity/pedido-produto.model';
import { PedidoStatus } from '@/domain/entity/pedido-status.model';
import { Pedido } from '@/domain/entity/pedido.model';
import { ErroNegocio } from '@/domain/exception/erro.module';
import { adicionarPedidoInput } from '@/infrastructure/dto/pedido/adicionarPedido.dto';
import { atualizarStatusPedidoInput } from '@/infrastructure/dto/pedido/atualizarPedido.dto';
import { ClienteService } from '@/infrastructure/repository/cliente/cliente.service';
import { PedidoService } from '@/infrastructure/repository/pedido/pedido.service';
import { ProdutoService } from '@/infrastructure/repository/produto/produto.service';
import { AutoMap } from '@automapper/classes';
import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';

class Input {
  @AutoMap()
  clienteCPF!: string;

  @AutoMap()
  pedidoProdutos: { produtoId: string; quantidade: number }[];
}

class Output {
  @AutoMap()
  id: string;

  @AutoMap()
  status: PedidoStatus;

  @AutoMap()
  cliente: Cliente;

  @AutoMap()
  valorTotal: number;

  @AutoMap()
  pedidoProdutos: PedidoProduto[];

  @AutoMap()
  dataCadastro: Date;

  @AutoMap()
  dataAtualizacao: Date;
}

createMap(mapper, Input, Cliente);
createMap(mapper, Cliente, Output);

@Injectable()
export class PedidoUseCase {
  constructor(
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private pedidoStatusService: PedidoStatusService,
    private pedidoProdutoService: PedidoProdutoService,
    private produtoService: ProdutoService,
  ) {}

  async adicionarPedido(input: adicionarPedidoInput): Promise<Output> {
    const pedido: Pedido = mapper.map(input, adicionarPedidoInput, Pedido);
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

    const pedidoStatus = await this.pedidoStatusService.findByTag(
      'pedido_recebido',
    );
    if (pedidoStatus) {
      pedido.status = pedidoStatus;
    }

    const produtos = await this.produtoService.find();

    pedido.pedidoProdutos.forEach((produto) => {
      const produtoEncontrado = produtos.find(
        (produtoEncontrado) => produtoEncontrado.id === produto.id,
      );

      if (!produtoEncontrado) {
        throw new ErroNegocio('pedido-produto-nao-existe');
      }
    });

    pedido.valorTotal = pedido.pedidoProdutos
      .map((pedidoProduto) => {
        const produto = produtos.find(
          (produto) => produto.id === pedidoProduto.id,
        );
        if (produto) {
          return produto?.preco * pedidoProduto.quantidade;
        }
        return 0;
      })
      .reduce((soma, preco) => soma + preco);

    const pedidoAdicionado = await this.pedidoService.save(pedido);

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

    const pedidoProdutoAdicionado = await this.pedidoProdutoService.saveMany(
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
    await this.pedidoService.removeById(id);
  }

  async atualizarPedidoStatusPorId(
    id: string,
    atualizarStatusPedidoInput: atualizarStatusPedidoInput,
  ): Promise<Output> {
    const pedidoEncontrado = await this.pedidoService.findById(id);

    if (!pedidoEncontrado) {
      throw new ErroNegocio('pedido-nao-existe');
    }

    const pedidoStatusEncontrado = await this.pedidoStatusService.findByTag(
      atualizarStatusPedidoInput.statusTag,
    );

    pedidoEncontrado.status = pedidoStatusEncontrado;

    const pedidoAtualizado = await this.pedidoService.save(pedidoEncontrado);

    return mapper.map(pedidoAtualizado, Pedido, Output);
  }

  async obterPedidoPorId(id: string): Promise<Output> {
    const pedido = await this.pedidoService.findById(id);

    if (!pedido) {
      throw new ErroNegocio('cliente-nao-cadastrado');
    }

    return mapper.map(pedido, Pedido, Output);
  }

  async obterPedidos(): Promise<Output[]> {
    const pedido = await this.pedidoService.find();

    return mapper.mapArray(pedido, Pedido, Output);
  }

  // async obterPedidosFila(): Promise<Output[]> {
  //   const pedidos = await this.pedidoService.findBy(
  //     {
  //         status: {
  //             tag: Not('pedido_finalizado')
  //         }
  //     },
  //     { dataCadastro: 'DESC' }
  //   );

  //   return mapper.mapArray(pedidos, Pedido, Output);
  // }
}
