import { Categoria } from '@/domain/entity/categoria.model';
import { Cliente } from '@/domain/entity/cliente.model';
import { CategoriaEntity } from '@/infrastructure/entity/categoria.entity';
import { ClienteEntity } from '@/infrastructure/entity/cliente.entity';
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
