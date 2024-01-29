import { AxiosClient } from '@/domain/client/axios.client';
import { IAxiosClient } from '@/domain/contract/client/axios.interface';
import { IPagamentoRepository } from '@/domain/contract/repository/pagamento.interface';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoEntity } from './entity/pagamento.entity';
import { ConnectionModule } from './repository/helper/connection.module';
import { PagamentoRepository } from './repository/pagamento/pagamento.repository';
@Module({
    imports: [TypeOrmModule.forFeature([PagamentoEntity]), ConnectionModule],
    providers: [
        { provide: IPagamentoRepository, useClass: PagamentoRepository },
        { provide: IAxiosClient, useClass: AxiosClient }
    ],
    exports: [ConnectionModule, IPagamentoRepository, IAxiosClient]
})
export default class InfrastructureModule {}
