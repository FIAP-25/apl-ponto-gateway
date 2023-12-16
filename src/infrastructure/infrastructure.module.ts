import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionModule } from './repository/helper/connection.module';
@Module({
    imports: [
        TypeOrmModule
            .forFeature
            // [CategoriaEntity, ClienteEntity, PedidoEntity, PedidoProdutoEntity, PedidoStatusEntity, ProdutoEntity, PedidoEntity, PedidoStatusEntity]
            (),
        ConnectionModule
    ],
    providers: [
        // { provide: IClienteRepository, useClass: ClienteRepository },
        // { provide: ICategoriaRepository, useClass: CategoriaRepository },
        // { provide: IProdutoRepository, useClass: ProdutoRepository },
        // { provide: IPedidoRepository, useClass: PedidoRepository },
        // { provide: IPedidoStatusRepository, useClass: PedidoStatusRepository },
        // { provide: IPedidoProdutoRepository, useClass: PedidoProdutoRepository }
    ],
    exports: [ConnectionModule]
})
export default class InfrastructureModule {}
