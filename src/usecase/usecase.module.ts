import { IPontoUseCase } from '@/domain/contract/usecase/ponto.interface';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PontoUseCase } from './ponto/ponto.usecase';
import InfrastructureModule from '@/infrastructure/infrastructure.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    providers: [{ provide: IPontoUseCase, useClass: PontoUseCase }],
    exports: [IPontoUseCase]
})
export default class UseCaseModule {}
