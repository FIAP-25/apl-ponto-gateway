import { ClienteUseCase } from '@/domain/port/usecase/cliente.usecase';
import InfrastructureModule from '@/infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [InfrastructureModule],
  providers: [ClienteUseCase],
  exports: [ClienteUseCase],
})
export default class DomainModule {}
