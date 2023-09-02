import { AtualizarStatusPagamentoInput, AtualizarStatusPagamentoOutput } from '@/infrastructure/dto/pagamento/atualizarStatusPagamento.dto';
import { ObterStatusPagamentoOutput } from '@/infrastructure/dto/pagamento/obterStatusPagamento.dto';

export abstract class IPagamentoUseCase {
    abstract obterStatusPagamento(pedidoId: string): Promise<ObterStatusPagamentoOutput>;
    abstract atualizarStatusPagamento(pedidoId: string, input: AtualizarStatusPagamentoInput): Promise<AtualizarStatusPagamentoOutput>;
}
