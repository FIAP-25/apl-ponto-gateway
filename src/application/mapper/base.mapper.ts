import { Cliente } from '@/domain/entity/cliente.model';
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
