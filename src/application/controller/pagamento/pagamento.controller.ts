import { ok } from '@/application/helper/http.helper';
import { PagamentoUseCase } from '@/domain/port/usecase/pagamento.usecase';
import { AtualizarStatusPagamentoInput } from '@/infrastructure/dto/pagamento/atualizarStatusPagamento.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('api/pagamentos')
export class PagamentoController {
  constructor(private pagamentoUseCase: PagamentoUseCase) {}

  @Get('status/:pedidoId')
  async obterStatusPagamento(
    @Query('pedidoId') pedidoId: string,
    @Res() res: Response,
  ): Promise<any> {
    const pagamentoStatus = await this.pagamentoUseCase.obterStatusPagamento(
      pedidoId,
    );

    return ok(pagamentoStatus, res);
  }

  @Patch('status/:pedidoId')
  async atualizarStatusPagamento(
    @Param('pedidoId') pedidoId: string,
    @Body() body: AtualizarStatusPagamentoInput,
    @Res() res: Response,
  ): Promise<any> {
    const pedidoAtualizado =
      await this.pagamentoUseCase.atualizarStatusPagamento(pedidoId, body);

    return ok(pedidoAtualizado, res);
  }
}
