import { ClienteUseCase } from '@/domain/port/usecase/cliente.usecase';
import InfrastructureModule from '@/infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { CategoriaUseCase } from './port/usecase/categoria.usecase';

@Module({
  imports: [InfrastructureModule],
  providers: [ClienteUseCase, CategoriaUseCase],
  exports: [ClienteUseCase, CategoriaUseCase],
})
export default class DomainModule {}
