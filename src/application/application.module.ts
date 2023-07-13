import DomainModule from '@/domain/domain.module';
import { Module } from '@nestjs/common';
import { ClienteController } from './controller/cliente/cliente.controller';

@Module({
  imports: [DomainModule],
  controllers: [ClienteController],
})
export default class ApplicationModule {}
