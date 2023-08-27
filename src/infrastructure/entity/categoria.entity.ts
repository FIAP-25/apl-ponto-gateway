import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categoria')
export class CategoriaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    descricao: string;

    // @OneToMany(() => ProdutoEntity, (produto) => produto.categoria)
    // produtos: ProdutoEntity[];

    validarCategoria(): boolean {
        return true;
    }
}