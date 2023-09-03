import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PedidoEntity } from './pedido.entity';

@Entity('pedido_status')
export class PedidoStatusEntity {
    @PrimaryColumn()
    tag: string;

    @Column()
    descricao: string;

    @OneToMany(() => PedidoEntity, (pedido) => pedido.status)
    pedidos: PedidoEntity[];
}
