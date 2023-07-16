import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ClienteUseCase } from '@/domain/port/usecase/cliente.usecase';
import { created } from '@/application/helper/http.helper';

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
}
