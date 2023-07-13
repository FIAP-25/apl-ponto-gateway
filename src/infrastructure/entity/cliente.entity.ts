import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('cliente')
export class ClienteEntity {
  @PrimaryColumn()
  cpf: string;

  @Column()
  email: string;

  @Column()
  nomeCompleto: string;

  // Relação para indicar os pedidos desse cliente
  // @OneToMany(() => PedidoEntity, (produto) => produto.cliente)
  // pedidos: ProdutoEntity[];

  //   validarClienteAdicionar(): boolean {
  //     return true;
  //   }

  //   validarClienteAtualizar(): boolean {
  //     return true;
  //   }
}
