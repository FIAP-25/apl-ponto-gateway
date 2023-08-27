import { ClienteService } from '@/infrastructure/repository/cliente/cliente.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './entity/cliente.entity';
import { ConnectionModule } from './repository/helper/connection.module';
import { CategoriaEntity } from './entity/categoria.entity';
import { CategoriaService } from './repository/categoria/categoria.service';
import { ProdutoEntity } from './entity/produto.entity';
import { PedidoEntity } from './entity/pedido.entity';
import { PedidoStatusEntity } from './entity/pedido-status.entity';
import { PedidoProdutoEntity } from './entity/pedido-produto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoriaEntity,
      ClienteEntity,
      PedidoEntity,
      PedidoProdutoEntity,
      PedidoStatusEntity,
      ProdutoEntity,
    ]),
    ConnectionModule,
  ],
  providers: [ClienteService, CategoriaService],
  exports: [ClienteService, CategoriaService, ConnectionModule],
})
export default class InfrastructureModule {}
