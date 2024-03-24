import UseCaseModule from '@/usecase/usecase.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BaseController } from './controller/base/base.controller';
import { HealthController } from './controller/health/health.controller';
import { PontoController } from './controller/ponto/ponto.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        UseCaseModule,
        HttpModule,
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
    controllers: [PontoController, HealthController, BaseController],
    exports: [HttpModule]
})
export default class ApplicationModule {}
