import { created, noContent, ok } from '@/application/helper/http.helper';
import { PedidoUseCase } from '@/domain/port/usecase/pedido.usecase';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('api/clientes')
export class ClienteController {
  constructor(private pedidoUseCase: PedidoUseCase) {}

  @Post()
  async adicionarPedido(@Body() body: any, @Res() res: Response) {
    const pedido = body;
    const pedidoAdicionado = await this.pedidoUseCase.adicionarPedido(pedido);

    return created(pedidoAdicionado, res);
  }

  @Delete(':id')
  async removerPedidoPorId(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    await this.pedidoUseCase.removerPedidoPorId(id);

    return noContent(res);
  }

  @Put(':id')
  async atualizarPedidoStatusPorId(
    @Param('id') id: string,
    @Body() body: any,
    @Res() res: Response,
  ): Promise<any> {
    const pedido = body;
    pedido.id = id;
    const pedidoAtualizado =
      await this.pedidoUseCase.atualizarPedidoStatusPorId(body);

    return ok(pedidoAtualizado, res);
  }

  @Get()
  async obterPedidos(@Res() res: Response): Promise<any> {
    const pedidos = await this.pedidoUseCase.obterPedidos();

    return ok(pedidos, res);
  }

  @Get()
  async obterPedidosFila(@Res() res: Response): Promise<any> {
    const pedidos = await this.pedidoUseCase.obterPedidosFila();

    return ok(pedidos, res);
  }

  @Get(':id')
  async obterPedidoPorId(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const cliente = await this.pedidoUseCase.obterPedidoPorId({ id });

    return ok(cliente, res);
  }
}
