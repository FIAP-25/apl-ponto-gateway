import { ClienteService } from '@/infrastructure/repository/cliente/cliente.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './entity/cliente.entity';
import { ConnectionModule } from './repository/helper/connection.module';
import { CategoriaEntity } from './entity/categoria.entity';
import { CategoriaService } from './repository/categoria/categoria.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClienteEntity, CategoriaEntity]),
    ConnectionModule,
  ],
  providers: [ClienteService, CategoriaService],
  exports: [ClienteService, CategoriaService, ConnectionModule],
})
export default class InfrastructureModule {}
