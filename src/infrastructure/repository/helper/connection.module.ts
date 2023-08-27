import { CategoriaEntity } from '@/infrastructure/entity/categoria.entity';
import { ClienteEntity } from '@/infrastructure/entity/cliente.entity';
import { PedidoProdutoEntity } from '@/infrastructure/entity/pedido-produto.entity';
import { PedidoStatusEntity } from '@/infrastructure/entity/pedido-status.entity';
import { PedidoEntity } from '@/infrastructure/entity/pedido.entity';
import { ProdutoEntity } from '@/infrastructure/entity/produto.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      username: 'root',
      password: 'root',
      database: 'fiap',
      port: 3306,
      entities: [
        CategoriaEntity,
        ClienteEntity,
        PedidoEntity,
        PedidoProdutoEntity,
        PedidoStatusEntity,
        ProdutoEntity,
      ],
      synchronize: true,
    }),
  ],
})
export class ConnectionModule {}
