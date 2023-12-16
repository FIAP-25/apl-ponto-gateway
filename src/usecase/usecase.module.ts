import { IPagamentoUseCase } from '@/domain/contract/usecase/pagamento.interface';
import InfrastructureModule from '@/infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { PagamentoUseCase } from './pagamento/pagamento.usecase';

@Module({
    imports: [InfrastructureModule],
    providers: [{ provide: IPagamentoUseCase, useClass: PagamentoUseCase }],
    exports: [IPagamentoUseCase]
})
export default class UseCaseModule {}
