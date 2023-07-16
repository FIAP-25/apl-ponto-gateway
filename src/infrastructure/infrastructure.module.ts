import { ClienteService } from '@/infrastructure/repository/cliente/cliente.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './entity/cliente.entity';
import { ConnectionModule } from './repository/helper/connection.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity]), ConnectionModule],
  providers: [ClienteService],
  exports: [ClienteService, ConnectionModule],
})
export default class InfrastructureModule {}
