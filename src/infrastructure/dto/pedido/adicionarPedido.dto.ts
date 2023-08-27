import { PedidoProduto } from '@/domain/entity/pedido-produto.model';
import { AutoMap } from '@automapper/classes';

export class adicionarPedidoInput {
  @AutoMap()
  clienteCPF: string;

  @AutoMap()
  pedidoProdutos: pedidoProduto[];
}

export class pedidoProduto {
  @AutoMap()
  produtoId: string;

  @AutoMap()
  quantidade: number;
}
