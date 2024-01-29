import { Pagamento } from '@/domain/entity/pagamento.model';

export abstract class IPagamentoRepository {
    abstract find(): Promise<Pagamento[]>;
    abstract findByPagamentoId(pagamentoId: string): Promise<Pagamento>;
    abstract findByPedidoId(pedidoId: string): Promise<Pagamento>;
    abstract save(pagamento: Pagamento): Promise<Pagamento>;
    abstract update(pagamento: Pagamento): Promise<Pagamento>;
}
