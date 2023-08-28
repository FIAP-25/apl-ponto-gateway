import { ok } from "@/application/helper/http.helper";
import { PagamentoUseCase } from "@/domain/port/usecase/pagamento.usecase";
import { AtualizarStatusPagamentoInput } from "@/infrastructure/dto/pagamento/atualizarStatusPagamento.dto";
import { Body, Controller, Param, Patch, Res } from "@nestjs/common";
import { Response } from 'express';

@Controller('api/pagamentos')
export class PagamentoController {
    constructor(private pagamentoUseCase: PagamentoUseCase) {}

    @Patch('status/:pedidoId')
    async atualizarStatusPagamento(
        @Param('pedidoId') pedidoId: string,
        @Body() body: AtualizarStatusPagamentoInput,
        @Res() res: Response
    ): Promise<any> {
        const pedidoAtualizado = await this.pagamentoUseCase.atualizarStatusPagamento(pedidoId, body)

        return ok(pedidoAtualizado, res);
    }
}
