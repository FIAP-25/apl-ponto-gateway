import { AutoMap } from '@automapper/classes';

export class ObterStatusPagamentoOutput {
  @AutoMap()
  id: String;

  @AutoMap()
  status: String;
}
