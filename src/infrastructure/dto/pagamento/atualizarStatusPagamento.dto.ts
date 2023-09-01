import { AutoMap } from '@automapper/classes';

export class AtualizarStatusPagamentoInput {
  @AutoMap()
  status: String;
}

export class AtualizarStatusPagamentoOutput {
  @AutoMap()
  id: String;

  @AutoMap()
  status: String;
}
