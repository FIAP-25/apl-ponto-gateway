import { Categoria } from '@/domain/entity/categoria.model';

export interface ICategoriaRepository {
  find(): Promise<Categoria[]>;
  findById(id: string): Promise<Categoria>;
  save(categoria: Categoria): Promise<Categoria>;
  saveMany(categoria: Categoria[]): Promise<Categoria[]>;
  remove(id: string): Promise<void>;
}
