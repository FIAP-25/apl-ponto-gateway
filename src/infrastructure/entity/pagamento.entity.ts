import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('pagamento')
export class PagamentoEntity {
    @ObjectIdColumn()
    id: string;

    @Column()
    pedidoId: string;

    @Column()
    notaFiscal: string;

    @Column()
    pagamentoStatus: string;
}
