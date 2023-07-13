import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from '@/infrastructure/entity/cliente.entity';
import { ClienteService } from '@/infrastructure/cliente.service';
import { ClienteUseCase } from '@/domain/port/usecase/cliente.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity])],
  controllers: [ClienteController],
  providers: [ClienteService, ClienteUseCase],
  exports: [ClienteService, ClienteUseCase],
})
export class ClienteModule {}
