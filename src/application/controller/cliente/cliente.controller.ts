import { Controller, Get, Param } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get(':cpf')
  obterClientePorCPF(@Param() params: any): string {
    return this.clienteService.obterClientePorCpf(params.cpf);
  }
}
