import { IPagamentoUseCase } from '@/domain/contract/usecase/pagamento.interface';
import InfrastructureModule from '@/infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { PagamentoUseCase } from './pagamento/pagamento.usecase';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        InfrastructureModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5
        })
    ],
    providers: [{ provide: IPagamentoUseCase, useClass: PagamentoUseCase }],
    exports: [IPagamentoUseCase]
})
export default class UseCaseModule {}
