import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('pagamento')
export class PagamentoEntity {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    pedidoId: string;

    @Column()
    notaFiscal: string;

    @Column()
    pagamentoStatus: string;
}
