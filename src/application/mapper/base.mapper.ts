import { AtualizarStatusPagamentoOutput } from '@/infrastructure/dto/pagamento/atualizarStatusPagamento.dto';
import { ObterStatusPagamentoOutput } from '@/infrastructure/dto/pagamento/obterStatusPagamento.dto';
import { classes } from '@automapper/classes';
import { createMap, createMapper } from '@automapper/core';

export const mapper = createMapper({
    strategyInitializer: classes()
});

// #region Pagamento

// createMap(mapper, Pedido, AtualizarStatusPagamentoOutput);
// createMap(mapper, Pedido, ObterStatusPagamentoOutput);
// #endregion
