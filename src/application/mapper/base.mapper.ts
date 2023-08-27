import { Categoria } from '@/domain/entity/categoria.model';
import { Cliente } from '@/domain/entity/cliente.model';
import { Produto } from '@/domain/entity/produto.model';
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
import { CategoriaEntity } from '@/infrastructure/entity/categoria.entity';
import { ClienteEntity } from '@/infrastructure/entity/cliente.entity';
import { ProdutoEntity } from '@/infrastructure/entity/produto.entity';
import { classes } from '@automapper/classes';
import { createMap, createMapper, forMember, mapFrom } from '@automapper/core';

export const mapper = createMapper({
  strategyInitializer: classes(),
});

// #region Cliente
createMap(
  mapper,
  ClienteEntity,
  Cliente,
  forMember(
    (destination) => destination.cpf,
    mapFrom((source) => source.cpf),
  ),
  forMember(
    (destination) => destination.email,
    mapFrom((source) => source.email),
  ),
  forMember(
    (destination) => destination.nomeCompleto,
    mapFrom((source) => source.nomeCompleto),
  ),
);

createMap(
  mapper,
  Cliente,
  ClienteEntity,
  forMember(
    (destination) => destination.cpf,
    mapFrom((source) => source.cpf),
  ),
  forMember(
    (destination) => destination.email,
    mapFrom((source) => source.email),
  ),
  forMember(
    (destination) => destination.nomeCompleto,
    mapFrom((source) => source.nomeCompleto),
  ),
);

createMap(mapper, AdicionarClienteInput, Cliente);
createMap(mapper, Cliente, AdicionarClienteOutput);

createMap(mapper, AtualizarClientePorCpfInput, Cliente);
createMap(mapper, Cliente, AtualizarClientePorCpfOutput);

createMap(mapper, Cliente, ObterClientePorCpfOutput);

createMap(mapper, Cliente, ObterClientesOutput);

// #endregion

// #region Categoria
createMap(
  mapper,
  CategoriaEntity,
  Categoria,
  forMember(
    (destination) => destination.id,
    mapFrom((source) => source.id),
  ),
  forMember(
    (destination) => destination.descricao,
    mapFrom((source) => source.descricao),
  ),
);

createMap(
  mapper,
  Categoria,
  CategoriaEntity,
  forMember(
    (destination) => destination.id,
    mapFrom((source) => source.id),
  ),
  forMember(
    (destination) => destination.descricao,
    mapFrom((source) => source.descricao),
  ),
);
// #endregion

// #region Produto
createMap(
  mapper,
  ProdutoEntity,
  Produto,
  forMember(
    (destination) => destination.id,
    mapFrom((source) => source.id),
  ),
  forMember(
    (destination) => destination.nome,
    mapFrom((source) => source.nome),
  ),
  forMember(
    (destination) => destination.descricao,
    mapFrom((source) => source.descricao),
  ),
  forMember(
    (destination) => destination.preco,
    mapFrom((source) => source.preco),
  ),
  forMember(
    (destination) => destination.categoria,
    mapFrom((source) => source.categoria),
  ),
);

createMap(
  mapper,
  Produto,
  ProdutoEntity,
  forMember(
    (destination) => destination.id,
    mapFrom((source) => source.id),
  ),
  forMember(
    (destination) => destination.nome,
    mapFrom((source) => source.nome),
  ),
  forMember(
    (destination) => destination.descricao,
    mapFrom((source) => source.descricao),
  ),
  forMember(
    (destination) => destination.preco,
    mapFrom((source) => source.preco),
  ),
  forMember(
    (destination) => destination.categoria,
    mapFrom((source) => source.categoria),
  ),
);
// #endregion
