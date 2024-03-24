import { ok, unauthorized } from '@/application/helper/http.helper';
import { IAutenticacaoUseCase } from '@/domain/contract/usecase/autenticacao.interface';
import { AutenticarInput } from '@/infrastructure/dto/autenticacao/autenticar.dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Autenticação')
@Controller('api/autenticacao')
export class AutenticacaoController {
    constructor(private _autenticacaoUseCase: IAutenticacaoUseCase) {}

    @Post('')
    @ApiOperation({ summary: 'Autentica o usuário' })
    async autenticar(@Body() body: AutenticarInput, @Res() res: Response): Promise<any> {
        const token = await this._autenticacaoUseCase.autenticarUsuario(body);

        if (token) {
            return ok(token, res);
        }

        return unauthorized(res);
    }
}
