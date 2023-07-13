import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ClienteUseCase } from '@/domain/port/usecase/cliente.usecase';

@Controller('api/clientes')
export class ClienteController {
  constructor(private clienteUseCase: ClienteUseCase) {}

  @Post()
  async adicionarCliente(@Body() body: any, @Res() res: Response) {
    const cliente = body;

    const clienteAdicionado = await this.clienteUseCase.adicionarCliente(
      cliente,
    );

    return res.status(HttpStatus.CREATED).send();
  }
}
