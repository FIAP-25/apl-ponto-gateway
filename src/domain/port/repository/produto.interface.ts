import { Produto } from '@/domain/entity/produto.model';
import { ProdutoEntity } from '@/infrastructure/entity/produto.entity';
import { FindOptionsWhere } from 'typeorm';

export interface IProdutoService {
  find(): Promise<Produto[]>;
  findById(id: string): Promise<Produto>;
  findBy(where: FindOptionsWhere<ProdutoEntity>): Promise<Produto[]>;
  save(produto: Produto): Promise<Produto>;
  saveMany(produto: Produto[]): Promise<Produto[]>;
  remove(id: string): Promise<void>;
}
