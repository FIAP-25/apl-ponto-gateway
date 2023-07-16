import { created, noContent } from '@/application/helper/http.helper';
import { ClienteUseCase } from '@/domain/port/usecase/cliente.usecase';
import { Body, Controller, Delete, Param, Post, Res } from '@nestjs/common';
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
}
