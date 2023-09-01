import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from './entity/categoria.entity';
import { ClienteEntity } from './entity/cliente.entity';
import { PedidoProdutoEntity } from './entity/pedido-produto.entity';
import { PedidoStatusEntity } from './entity/pedido-status.entity';
import { PedidoEntity } from './entity/pedido.entity';
import { ProdutoEntity } from './entity/produto.entity';
import { CategoriaRepository } from './repository/categoria/categoria.repository';
import { ClienteRepository } from './repository/cliente/cliente.repository';
import { ConnectionModule } from './repository/helper/connection.module';
import { ProdutoRepository } from './repository/produto/produto.service';
import { PedidoRepository } from './repository/pedido/pedido.repository';
import { PedidoStatusRepository } from './repository/pedido-status/pedido-status.repository';
import { PedidoProdutoRepository } from './repository/pedido-produto/pedido-produto.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoriaEntity,
      ClienteEntity,
      PedidoEntity,
      PedidoProdutoEntity,
      PedidoStatusEntity,
      ProdutoEntity,
      PedidoEntity,
      PedidoStatusEntity
    ]),
    ConnectionModule,
  ],
  providers: [ClienteRepository, CategoriaRepository, ProdutoRepository, PedidoRepository, PedidoStatusRepository, PedidoProdutoRepository],
  exports: [
    ClienteRepository,
    CategoriaRepository,
    ProdutoRepository,
    PedidoRepository,
    PedidoStatusRepository,
    PedidoProdutoRepository,
    ConnectionModule,
  ],
})
export default class InfrastructureModule {}
