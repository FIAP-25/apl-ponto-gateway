import { IPontoUseCase } from '@/domain/contract/usecase/ponto.interface';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PontoUseCase } from './ponto/ponto.usecase';
import InfrastructureModule from '@/infrastructure/infrastructure.module';

@Module({
    imports: [
        InfrastructureModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5
        })
    ],
    providers: [{ provide: IPontoUseCase, useClass: PontoUseCase }],
    exports: [IPontoUseCase]
})
export default class UseCaseModule {}
