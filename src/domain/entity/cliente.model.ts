import { AutoMap } from '@automapper/classes';

export class Cliente {
  @AutoMap()
  cpf: string;

  @AutoMap()
  email: string;

  @AutoMap()
  nomeCompleto: string;

  validarClienteAdicionar(): boolean {
    // if (!validarCPF(this.cpf)) throw new ErroNegocio('cliente-cpf-invalido');
    // if (!validarEmail(this.email))
    //   throw new ErroNegocio('cliente-email-invalido');
    // if (this.nomeCompleto.length <= 2)
    //   throw new ErroNegocio('cliente-nome-invalido');
    return true;
  }

  validarClienteAtualizar(): boolean {
    // if (!validarEmail(this.email))
    //   throw new ErroNegocio('cliente-email-invalido');
    // if (this.nomeCompleto.length <= 2)
    //   throw new ErroNegocio('cliente-nome-invalido');
    return true;
  }
}
