import { AutoMap } from '@automapper/classes';

export class Categoria {
    @AutoMap()
    id: string;

    @AutoMap()
    descricao: string;

    validarCategoria(): boolean {
        // if (this.descricao === '' || this.descricao === undefined) throw new ErroNegocio('categoria-descricao-vazia');

        return true;
    }
}