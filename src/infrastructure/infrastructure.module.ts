import { ClienteService } from '@/infrastructure/repository/cliente/cliente.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './entity/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity])],
  providers: [ClienteService],
  exports: [ClienteService],
})
export default class InfrastructureModule {}
