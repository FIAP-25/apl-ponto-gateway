import { mapper } from '@/application/mapper/base.mapper';
import { IPagamentoRepository } from '@/domain/contract/repository/pagamento.interface';
import { Pagamento } from '@/domain/entity/pagamento.model';
import { PagamentoEntity } from '@/infrastructure/entity/pagamento.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class PagamentoRepository implements IPagamentoRepository {
    constructor(
        @InjectRepository(PagamentoEntity)
        private pagamentoRepository: Repository<PagamentoEntity>
    ) {}

    async find(): Promise<Pagamento[]> {
        const pagamentos = await this.pagamentoRepository.find();
        return mapper.mapArray(pagamentos, PagamentoEntity, Pagamento);
    }

    // async findByPedidoId(pedidoId: string): Promise<Pagamento> {
    //     const pagamento = await this.pagamentoRepository.findOneBy({ pedidoId: pedidoId });

    //     return mapper.map(pagamento, PagamentoEntity, Pagamento);
    // }

    async save(pagamento: Pagamento): Promise<void> {
        await this.pagamentoRepository.save(pagamento);
    }
}
