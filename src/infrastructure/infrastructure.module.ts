import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionModule } from './repository/helper/connection.module';
import { PagamentoEntity } from './entity/pagamento.entity';
import { IPagamentoRepository } from '@/domain/contract/repository/pagamento.interface';
import { PagamentoRepository } from './repository/pagamento/pagamento.repository';
@Module({
    imports: [TypeOrmModule.forFeature([PagamentoEntity]), ConnectionModule],
    providers: [{ provide: IPagamentoRepository, useClass: PagamentoRepository }],
    exports: [ConnectionModule, IPagamentoRepository]
})
export default class InfrastructureModule {}
