import { ok } from '@/application/helper/http.helper';
import { IPagamentoUseCase } from '@/domain/contract/usecase/pagamento.interface';
import { AtualizarStatusPagamentoInput } from '@/infrastructure/dto/pagamento/atualizarStatusPagamento.dto';
import { Body, Controller, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Pagamentos')
@Controller('api/pagamentos')
export class PagamentoController {
    constructor(private pagamentoUseCase: IPagamentoUseCase) {}

    @Get()
    @ApiOperation({ summary: 'Obter pagamentos' })
    async obterPagamentos(@Res() res: Response): Promise<any> {
        const pagamentos = await this.pagamentoUseCase.obterPagamentos();

        return ok(pagamentos, res);
    }

    @Get('status/:pedidoId')
    @ApiOperation({ summary: 'Obtem status pagamento pelo id do pedido' })
    async obterStatusPagamento(@Query('pedidoId') pedidoId: string, @Res() res: Response): Promise<any> {
        const pagamentoStatus = await this.pagamentoUseCase.obterStatusPagamento(pedidoId);

        return ok(pagamentoStatus, res);
    }

    @Patch('status/:pedidoId')
    @ApiOperation({ summary: 'Atualiza status pagamento pelo id do pedido' })
    async atualizarStatusPagamento(@Param('pedidoId') pedidoId: string, @Body() body: AtualizarStatusPagamentoInput, @Res() res: Response): Promise<any> {
        const pedidoAtualizado = await this.pagamentoUseCase.atualizarStatusPagamento(pedidoId, body);

        return ok(pedidoAtualizado, res);
    }

    @Post('pagar/:pedidoId')
    @ApiOperation({ summary: 'Paga um pedido' })
    async pagarPedido(@Param('pedidoId') pedidoId: string, @Res() res: Response): Promise<any> {
        console.log('entrou pedido: ', pedidoId);
        const pedidoAtualizado = await this.pagamentoUseCase.realizarPagamento(pedidoId);
        return ok(pedidoAtualizado, res);
    }
}
