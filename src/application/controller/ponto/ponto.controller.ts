import { noContent } from '@/application/helper/http.helper';
import { IPontoUseCase } from '@/domain/contract/usecase/ponto.interface';
import { AutenticacaoGuard } from '@/guard/autenticacao.guard';
import { MarcarPontoInput } from '@/infrastructure/dto/ponto/marcarPonto.dto';
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';

@ApiTags('Ponto')
@Controller('api/ponto')
export class PontoController {
    constructor(private pontoUseCase: IPontoUseCase) {}

    @UseGuards(AutenticacaoGuard)
    @Post('registrar')
    @ApiOperation({ summary: 'Registra um ponto' })
    async registrarPonto(@Body() body: MarcarPontoInput, @Res() res: Response, @Req() req: Request): Promise<any> {
        const dados: MarcarPontoInput & { matricula: string } = { ...body, matricula: '' };
        if (req.matricula) {
            dados.matricula = req.matricula;
            await this.pontoUseCase.enviaRegistroFila(dados);
        }
        return noContent(res);
    }
}
