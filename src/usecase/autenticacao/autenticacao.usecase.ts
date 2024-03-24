import { IAutenticacaoUseCase } from '@/domain/contract/usecase/autenticacao.interface';
import { Autenticacao } from '@/domain/entity/autenticacao.model';
import { AutenticarInput } from '@/infrastructure/dto/autenticacao/autenticar.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const usuariosPermitidos = [{ matricula: '441898', senha: '1234' }];

@Injectable()
export class AutenticacaoUseCase implements IAutenticacaoUseCase {
    constructor(private _jwtService: JwtService) {}
    async autenticarUsuario(input: AutenticarInput): Promise<Autenticacao | null> {
        const usuarioEncontrado = usuariosPermitidos.find((x) => x.matricula === input.matricula && x.senha === input.senha);

        if (usuarioEncontrado) {
            const payload = { matricula: input.matricula };
            return { token: await this._jwtService.signAsync(payload) };
        }
        return null;
    }
}
