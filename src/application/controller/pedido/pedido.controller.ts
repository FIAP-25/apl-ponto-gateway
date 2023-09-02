import { custom_response_success, noContent, ok } from '@/application/helper/http.helper';

import { AdicionarPedidoInput } from '@/infrastructure/dto/pedido/adicionarPedido.dto';
import { AtualizarStatusPedidoInput } from '@/infrastructure/dto/pedido/atualizarPedido.dto';
import { webhookPedido } from '@/infrastructure/dto/pedido/webhookPedido.dto';
import { PedidoUseCase } from '@/usecase/pedido/pedido.usecase';
import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Pedidos')
@Controller('api/pedidos')
export class PedidoController {
    constructor(private pedidoUseCase: PedidoUseCase) {}

    @Post()
    async adicionarPedido(@Body() body: AdicionarPedidoInput, @Res() res: Response) {
        console.log(body);
        const pedido = body;
        const pedidoAdicionado = await this.pedidoUseCase.adicionarPedido(pedido);

        return custom_response_success(pedidoAdicionado.id, res);
    }

    @Delete(':id')
    async removerPedidoPorId(@Param('id') id: string, @Res() res: Response): Promise<any> {
        await this.pedidoUseCase.removerPedidoPorId(id);

        return noContent(res);
    }

    @Patch('/status/:id')
    async atualizarPedidoStatusPorId(@Param('id') id: string, @Body() body: AtualizarStatusPedidoInput, @Res() res: Response): Promise<any> {
        const pedidoAtualizado = await this.pedidoUseCase.atualizarPedidoStatusPorId(id, body);

        return ok(pedidoAtualizado, res);
    }

    @Get()
    async obterPedidos(@Res() res: Response): Promise<any> {
        const pedidos = await this.pedidoUseCase.obterPedidos();

        return ok(pedidos, res);
    }

    @Patch('/webhook')
    async webhookConfirmacaoPedido(@Param('id') id: string, @Body() body: webhookPedido, @Res() res: Response): Promise<any> {
        const pedidos = await await this.pedidoUseCase.webhookConfirmacaoPagamento(body);

        return ok(pedidos, res);
    }

    @Get('/fila')
    async obterPedidosFila(@Res() res: Response): Promise<any> {
        const pedidos = await this.pedidoUseCase.obterFilaPedidos();

        return ok(pedidos, res);
    }

    @Get(':id')
    async obterPedidoPorId(@Param('id') id: string, @Res() res: Response): Promise<any> {
        const pedido = await this.pedidoUseCase.obterPedidoPorId(id);

        return ok(pedido, res);
    }
}
