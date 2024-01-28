import { Pagamento } from '@/domain/entity/pagamento.model';
import { ObjectId } from 'typeorm';

export abstract class IPagamentoRepository {
    abstract find(): Promise<Pagamento[]>;
    abstract findByPagamentoId(pagamentoId: string): Promise<Pagamento>;
    abstract save(pagamento: Pagamento): Promise<Pagamento>;
}
