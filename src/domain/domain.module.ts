import { ClienteUseCase } from '@/domain/port/usecase/cliente.usecase';
import InfrastructureModule from '@/infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { CategoriaUseCase } from './port/usecase/categoria.usecase';
import { ProdutoUseCase } from './port/usecase/produto.usecase';
import { PedidoUseCase } from './port/usecase/pedido.usecase';

@Module({
  imports: [InfrastructureModule],
  providers: [ClienteUseCase, CategoriaUseCase, ProdutoUseCase, PedidoUseCase],
  exports: [ClienteUseCase, CategoriaUseCase, ProdutoUseCase, PedidoUseCase],
})
export default class DomainModule {}
