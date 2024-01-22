import { AtualizarStatusPagamentoInput, AtualizarStatusPagamentoOutput } from '@/infrastructure/dto/pagamento/atualizarStatusPagamento.dto';
import { ObterPagamentoOutput } from '@/infrastructure/dto/pagamento/obterPagamento.dto';
import { ObterStatusPagamentoOutput } from '@/infrastructure/dto/pagamento/obterStatusPagamento.dto';
import { RealizarPagamentoOutput } from '@/infrastructure/dto/pagamento/realizarPagamento.dto';

export abstract class IPagamentoUseCase {
    abstract obterStatusPagamento(pedidoId: string): Promise<ObterStatusPagamentoOutput>;
    abstract atualizarStatusPagamento(pedidoId: string, input: AtualizarStatusPagamentoInput): Promise<AtualizarStatusPagamentoOutput>;
    abstract realizarPagamento(pedidoId: string): Promise<RealizarPagamentoOutput>;
    abstract obterPagamentos(): Promise<ObterPagamentoOutput[]>;
    abstract obterPedidosFila(): Promise<any[]>;
}
