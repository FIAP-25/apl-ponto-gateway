import { created, noContent, ok } from '@/application/helper/http.helper';
import { ClienteUseCase } from '@/domain/port/usecase/cliente.usecase';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('api/clientes')
export class ClienteController {
  constructor(private clienteUseCase: ClienteUseCase) {}

  @Post()
  async adicionarCliente(@Body() body: any, @Res() res: Response) {
    const cliente = body;

    const clienteAdicionado = await this.clienteUseCase.adicionarCliente(
      cliente,
    );

    return created(clienteAdicionado, res);
  }

  @Delete(':cpf')
  async removerClientePorCPF(
    @Param('cpf') cpf: string,
    @Res() res: Response,
  ): Promise<any> {
    await this.clienteUseCase.removerClientePorCPF(cpf);

    return noContent(res);
  }

  @Put(':cpf')
  async atualizarClientePorCPF(
    @Param('cpf') cpf: string,
    @Body() body: any,
    @Res() res: Response,
  ): Promise<any> {
    const cliente = body;

    cliente.cpf = cpf;

    const clienteAtualizado = await this.clienteUseCase.atualizarClientePorCPF(
      cliente,
    );

    return ok(clienteAtualizado, res);
  }
}
