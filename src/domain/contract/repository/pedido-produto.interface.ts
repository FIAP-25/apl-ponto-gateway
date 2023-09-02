import { Pedido } from '@/domain/entity/pedido.model';
import { Produto } from '@/domain/entity/produto.model';
import { ProdutoEntity } from '@/infrastructure/entity/produto.entity';
import { FindOptionsWhere } from 'typeorm';

export interface IPedidoProdutoRepository {
    find(): Promise<Pedido[]>;
    findById(id: string): Promise<Pedido>;
    save(pedido: Pedido): Promise<Pedido>;
    removeById(id: string): Promise<void>;
}
