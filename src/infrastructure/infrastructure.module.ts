import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionModule } from './repository/helper/connection.module';
import { PagamentoEntity } from './entity/pagamento.entity';
import { IPagamentoRepository } from '@/domain/contract/repository/pagamento.interface';
import { PagamentoRepository } from './repository/pagamento/pagamento.repository';
import { IPedidoClient } from '@/domain/client/pedido.client.interface';
import { PedidoClient } from '@/domain/client/pedido.client';
@Module({
    imports: [TypeOrmModule.forFeature([PagamentoEntity]), ConnectionModule],
    providers: [
        { provide: IPagamentoRepository, useClass: PagamentoRepository },
        { provide: IPedidoClient, useClass: PedidoClient }
    ],
    exports: [ConnectionModule, IPagamentoRepository, IPedidoClient]
})
export default class InfrastructureModule {}
