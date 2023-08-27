import { Categoria } from '@/domain/entity/categoria.model';
import { Cliente } from '@/domain/entity/cliente.model';

export interface ICategoriaService {
  find(): Promise<Categoria[]>;
  findById(id: string): Promise<Categoria>;
  save(categoria: Categoria): Promise<Categoria>;
  saveMany(categoria: Categoria[]): Promise<Categoria[]>;
  remove(id: string): Promise<void>;
}
