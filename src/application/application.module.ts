import UseCaseModule from '@/usecase/usecase.module';
import { Module } from '@nestjs/common';
import { HeatlhController } from './controller/health/health.controller';
import { PagamentoController } from './controller/pagamento/pagamento.controller';
import { BaseController } from './controller/base/base.controller';

@Module({
    imports: [UseCaseModule],
    controllers: [PagamentoController, HeatlhController, BaseController]
})
export default class ApplicationModule {}
