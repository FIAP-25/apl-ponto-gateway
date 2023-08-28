import DomainModule from '@/domain/domain.module';
import { Module } from '@nestjs/common';
import { CategoriaController } from './controller/categoria/categoria.controller';
import { ClienteController } from './controller/cliente/cliente.controller';
import { ProdutoController } from './controller/produto/produto.controller';
import { PedidoController } from './controller/pedido/pedido.controller';
import { PagamentoController } from './controller/pagamento/pagamento.controller';

@Module({
  imports: [DomainModule],
  controllers: [ClienteController, CategoriaController, ProdutoController, PedidoController, PagamentoController],
})
export default class ApplicationModule {}
