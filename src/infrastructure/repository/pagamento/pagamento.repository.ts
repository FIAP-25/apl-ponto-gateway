import { mapper } from '@/application/mapper/base.mapper';
import { IPagamentoRepository } from '@/domain/contract/repository/pagamento.interface';
import { Pagamento } from '@/domain/entity/pagamento.model';
import { PagamentoEntity } from '@/infrastructure/entity/pagamento.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { ObjectId } from 'mongodb';

@Injectable()
export class PagamentoRepository implements IPagamentoRepository {
    constructor(
        @InjectRepository(PagamentoEntity)
        private pagamentoRepository: Repository<PagamentoEntity>
    ) {}
    

    async find(): Promise<Pagamento[]> {
        const pagamentos: PagamentoEntity[] = await this.pagamentoRepository.find();        
        return mapper.mapArray(pagamentos, PagamentoEntity, Pagamento);
    }

    async findByPagamentoId(pagamentoId: string): Promise<Pagamento> {        
        const id = new ObjectId(pagamentoId);        
        const pagamento = await this.pagamentoRepository.findOneBy({ _id: id });
        
        return mapper.map(pagamento, PagamentoEntity, Pagamento);
    }

    async findByPedidoId(pedidoId: string): Promise<Pagamento> {      
        const pagamento = await this.pagamentoRepository.findOneBy({ pedidoId: pedidoId });
        return mapper.map(pagamento, PagamentoEntity, Pagamento);
    }
    

    async save(pagamento: Pagamento): Promise<Pagamento> {
        pagamento._id = new ObjectId(pagamento._id);
        return await this.pagamentoRepository.save(pagamento);
    }

    async update(pagamento: Pagamento): Promise<Pagamento> {       
        return await this.pagamentoRepository.save(pagamento);
    }
}
