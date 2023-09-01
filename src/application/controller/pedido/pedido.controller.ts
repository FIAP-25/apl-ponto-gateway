import {
  created,
  custom_response_success,
  noContent,
  ok,
} from '@/application/helper/http.helper';
import { PedidoUseCase } from '@/domain/port/usecase/pedido.usecase';
import { adicionarPedidoInput } from '@/infrastructure/dto/pedido/adicionarPedido.dto';
import { atualizarStatusPedidoInput } from '@/infrastructure/dto/pedido/atualizarPedido.dto';
import { webhookPedido } from '@/infrastructure/dto/pedido/webhookPedido.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('api/pedidos')
export class PedidoController {
  constructor(private pedidoUseCase: PedidoUseCase) {}

  @Post()
  async adicionarPedido(
    @Body() body: adicionarPedidoInput,
    @Res() res: Response,
  ) {
    console.log(body);
    const pedido = body;
    const pedidoAdicionado = await this.pedidoUseCase.adicionarPedido(pedido);

    return custom_response_success(pedidoAdicionado.id, res);
  }

  @Delete(':id')
  async removerPedidoPorId(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    await this.pedidoUseCase.removerPedidoPorId(id);

    return noContent(res);
  }

  @Patch('/status/:id')
  async atualizarPedidoStatusPorId(
    @Param('id') id: string,
    @Body() body: atualizarStatusPedidoInput,
    @Res() res: Response,
  ): Promise<any> {
    const pedidoAtualizado =
      await this.pedidoUseCase.atualizarPedidoStatusPorId(id, body);

    return ok(pedidoAtualizado, res);
  }

  @Get()
  async obterPedidos(@Res() res: Response): Promise<any> {
    const pedidos = await this.pedidoUseCase.obterPedidos();

    return ok(pedidos, res);
  }

  @Get('/status/pagamento/:id')
  async obterStatusPedidos(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const pedidos = await await this.pedidoUseCase.obterStatusPedidosPorId(id);

    return ok(pedidos, res);
  }

  @Patch('/webhook')
  async webhookConfirmacaoPedido(
    @Param('id') id: string,
    @Body() body: webhookPedido,
    @Res() res: Response,
  ): Promise<any> {
    const pedidos = await await this.pedidoUseCase.obterStatusPedidosPorId(id);

    return ok(pedidos, res);
  }

  // @Get()
  // async obterPedidosFila(@Res() res: Response): Promise<any> {
  //   const pedidos = await this.pedidoUseCase.obterPedidosFila();

  //   return ok(pedidos, res);
  // }

  @Get(':id')
  async obterPedidoPorId(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const cliente = await this.pedidoUseCase.obterPedidoPorId(id);

    return ok(cliente, res);
  }
}
