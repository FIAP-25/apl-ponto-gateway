import DomainModule from '@/domain/domain.module';
import { Module } from '@nestjs/common';
import { CategoriaController } from './controller/categoria/categoria.controller';
import { ClienteController } from './controller/cliente/cliente.controller';

@Module({
  imports: [DomainModule],
  controllers: [ClienteController, CategoriaController],
})
export default class ApplicationModule {}
