import InfrastructureModule from '@/infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { CategoriaUseCase } from './categoria/categoria.usecase';
import { ClienteUseCase } from './cliente/cliente.usecase';
import { ProdutoUseCase } from './produto/produto.usecase';
import { PedidoUseCase } from './pedido/pedido.usecase';
import { PagamentoUseCase } from './pagamento/pagamento.usecase';

@Module({
    imports: [InfrastructureModule],
    providers: [ClienteUseCase, CategoriaUseCase, ProdutoUseCase, PedidoUseCase, PagamentoUseCase],
    exports: [ClienteUseCase, CategoriaUseCase, ProdutoUseCase, PedidoUseCase, PagamentoUseCase]
})
export default class UseCaseModule {}
