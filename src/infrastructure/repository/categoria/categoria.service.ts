import { mapper } from '@/application/mapper/base.mapper';
import { Categoria } from '@/domain/entity/categoria.model';
import { ICategoriaService } from '@/domain/port/repository/categoria.interface';
import { CategoriaEntity } from '@/infrastructure/entity/categoria.entity';
import { Injectable } from '@nestjs/common';
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
    const categoria = await this.categoriaRepository.findOneBy({ id: id });
    return mapper.map(categoria, CategoriaEntity, Categoria);
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
