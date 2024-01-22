import UseCaseModule from '@/usecase/usecase.module';
import { Module } from '@nestjs/common';
import { HeatlhController } from './controller/health/health.controller';
import { PagamentoController } from './controller/pagamento/pagamento.controller';
import { BaseController } from './controller/base/base.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [UseCaseModule, HttpModule],
    controllers: [PagamentoController, HeatlhController, BaseController],
    exports: [HttpModule]
})
export default class ApplicationModule {}
