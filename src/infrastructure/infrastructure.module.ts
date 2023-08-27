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
  providers: [ClienteRepository, CategoriaRepository, ProdutoRepository],
  exports: [
    ClienteRepository,
    CategoriaRepository,
    ProdutoRepository,
    ConnectionModule,
  ],
})
export default class InfrastructureModule {}
