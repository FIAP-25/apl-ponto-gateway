import { Pagamento } from '@/domain/entity/pagamento.model';
import { RealizarPagamentoOutput } from '@/infrastructure/dto/pagamento/realizarPagamento.dto';
import { PagamentoEntity } from '@/infrastructure/entity/pagamento.entity';
import { classes } from '@automapper/classes';
import { createMap, createMapper, forMember, mapFrom } from '@automapper/core';

export const mapper = createMapper({
    strategyInitializer: classes()
});

// #region Pagamento

createMap(mapper, PagamentoEntity, Pagamento);
createMap(
    mapper,
    Pagamento,
    RealizarPagamentoOutput,
    forMember(
        (destination) => destination.id,
        mapFrom((source) => String(source.id))
    )
);
// #endregion
