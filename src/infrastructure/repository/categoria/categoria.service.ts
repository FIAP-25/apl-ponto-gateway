import { mapper } from '@/application/mapper/base.mapper';
import { Categoria } from '@/domain/entity/categoria.model';
import { Cliente } from '@/domain/entity/cliente.model';
import { ICategoriaService } from '@/domain/port/repository/categoria.interface';
import { IClienteService } from '@/domain/port/repository/cliente.interface';
import { CategoriaEntity } from '@/infrastructure/entity/categoria.entity';
import { ClienteEntity } from '@/infrastructure/entity/cliente.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class CategoriaService implements ICategoriaService {
  constructor(
    @InjectRepository(CategoriaEntity)
    private categoriaRepository: Repository<CategoriaEntity>,
  ) {}

  async find(): Promise<Categoria[]> {
    const categoria = await this.categoriaRepository.find();
    return mapper.mapArray(categoria, CategoriaEntity, Categoria);
  }

  async findById(id: string): Promise<Categoria> {
    const categorias = await this.categoriaRepository.findOneBy({ id: id });
    return mapper.map(categorias, CategoriaEntity, Categoria);
  }

  async save(categoria: Categoria): Promise<Categoria> {
    const resultado = await this.categoriaRepository.save(categoria);
    return resultado;
  }

  async saveMany(categorias: Categoria[]): Promise<Categoria[]> {
    const resultado = await this.categoriaRepository.save(categorias);
    return resultado;
  }

  async remove(id: string): Promise<void> {
    await this.categoriaRepository.delete(id);
  }
}
