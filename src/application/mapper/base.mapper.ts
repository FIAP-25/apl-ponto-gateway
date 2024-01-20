import { Pagamento } from '@/domain/entity/pagamento.model';
import { ObterPagamentoOutput } from '@/infrastructure/dto/pagamento/obterPagamento.dto';
import { RealizarPagamentoOutput } from '@/infrastructure/dto/pagamento/realizarPagamento.dto';
import { PagamentoEntity } from '@/infrastructure/entity/pagamento.entity';
import { classes } from '@automapper/classes';
import { createMap, createMapper, forMember, mapFrom } from '@automapper/core';

export const mapper = createMapper({
    strategyInitializer: classes()
});

// #region Pagamento

createMap(
    mapper,
    PagamentoEntity,
    Pagamento,
    forMember(
        (destination) => destination.id,
        mapFrom((source) => String(source.id))
    ),
    forMember(
        (destination) => destination.pedidoId,
        mapFrom((source) => source.pedidoId)
    ),
    forMember(
        (destination) => destination.notaFiscal,
        mapFrom((source) => source.notaFiscal)
    ),
    forMember(
        (destination) => destination.pagamentoStatus,
        mapFrom((source) => source.pagamentoStatus)
    )
);

createMap(
    mapper,
    Pagamento,
    RealizarPagamentoOutput,
    forMember(
        (destination) => destination.id,
        mapFrom((source) => String(source.id))
    ),
    forMember(
        (destination) => destination.pedidoId,
        mapFrom((source) => source.pedidoId)
    ),
    forMember(
        (destination) => destination.notaFiscal,
        mapFrom((source) => source.notaFiscal)
    ),
    forMember(
        (destination) => destination.pagamentoStatus,
        mapFrom((source) => source.pagamentoStatus)
    )
);

createMap(
    mapper,
    Pagamento,
    ObterPagamentoOutput,
    forMember(
        (destination) => destination.id,
        mapFrom((source) => String(source.id))
    ),
    forMember(
        (destination) => destination.pedidoId,
        mapFrom((source) => source.pedidoId)
    ),
    forMember(
        (destination) => destination.notaFiscal,
        mapFrom((source) => source.notaFiscal)
    ),
    forMember(
        (destination) => destination.pagamentoStatus,
        mapFrom((source) => source.pagamentoStatus)
    )
);
// #endregion
