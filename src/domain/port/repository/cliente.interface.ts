import { Cliente } from '@/domain/entity/cliente.model';

export interface IClienteRepository {
  find(): Promise<Cliente[]>;
  findByCPF(cpf: string): Promise<Cliente>;
  save(cliente: Cliente): Promise<Cliente>;
  saveMany(clientes: Cliente[]): Promise<Cliente[]>;
  remove(id: string): Promise<void>;
}
