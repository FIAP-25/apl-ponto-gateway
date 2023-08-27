import { ClienteService } from '@/infrastructure/repository/cliente/cliente.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from './entity/categoria.entity';
import { ClienteEntity } from './entity/cliente.entity';
import { PedidoProdutoEntity } from './entity/pedido-produto.entity';
import { PedidoStatusEntity } from './entity/pedido-status.entity';
import { PedidoEntity } from './entity/pedido.entity';
import { ProdutoEntity } from './entity/produto.entity';
import { CategoriaService } from './repository/categoria/categoria.service';
import { ConnectionModule } from './repository/helper/connection.module';
import { ProdutoService } from './repository/produto/produto.service';

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
  providers: [ClienteService, CategoriaService, ProdutoService],
  exports: [ClienteService, CategoriaService, ProdutoService, ConnectionModule],
})
export default class InfrastructureModule {}
