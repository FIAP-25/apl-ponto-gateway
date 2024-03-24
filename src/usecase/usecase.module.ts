import { IAutenticacaoUseCase } from '@/domain/contract/usecase/autenticacao.interface';
import { IPontoUseCase } from '@/domain/contract/usecase/ponto.interface';
import InfrastructureModule from '@/infrastructure/infrastructure.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AutenticacaoUseCase } from './autenticacao/autenticacao.usecase';
import { PontoUseCase } from './ponto/ponto.usecase';

@Module({
    imports: [
        InfrastructureModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5
        }),
        ClientsModule.register([
            {
                name: 'PONTO_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqps://vjeublcb:5H-qWFm_i9vJ1duE58Ux14obQm8amJp5@moose.rmq.cloudamqp.com/vjeublcb'],
                    queue: 'ponto-queue',
                    queueOptions: {
                        durable: false
                    }
                }
            }
        ])
    ],
    providers: [
        { provide: IPontoUseCase, useClass: PontoUseCase },
        { provide: IAutenticacaoUseCase, useClass: AutenticacaoUseCase }
    ],
    exports: [IPontoUseCase, IAutenticacaoUseCase]
})
export default class UseCaseModule {}
