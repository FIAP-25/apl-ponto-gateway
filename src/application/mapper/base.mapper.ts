import { Pagamento } from '@/domain/entity/pagamento.model';
import { PagamentoEntity } from '@/infrastructure/entity/pagamento.entity';
import { classes } from '@automapper/classes';
import { createMap, createMapper } from '@automapper/core';

export const mapper = createMapper({
    strategyInitializer: classes()
});

// #region Pagamento

createMap(mapper, PagamentoEntity, Pagamento);
// #endregion
