import { noContent } from '@/application/helper/http.helper';
import { IPontoUseCase } from '@/domain/contract/usecase/ponto.interface';
import { MarcarPontoInput } from '@/infrastructure/dto/marcarPonto.dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Ponto')
@Controller('api/ponto')
export class PontoController {
    constructor(private pontoUseCase: IPontoUseCase) {}

    @Post('registrar')
    @ApiOperation({ summary: 'Registra um ponto' })
    async registrarPonto(@Body() body: MarcarPontoInput, @Res() res: Response): Promise<any> {
        await this.pontoUseCase.enviaRegistroFila(body);
        return noContent(res);
    }
}
