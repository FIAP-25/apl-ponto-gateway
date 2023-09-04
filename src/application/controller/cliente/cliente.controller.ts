import { created, noContent, ok } from '@/application/helper/http.helper';
import { IClienteUseCase } from '@/domain/contract/usecase/cliente.interface';
import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Clientes')
@Controller('api/clientes')
export class ClienteController {
    constructor(private clienteUseCase: IClienteUseCase) {}

    @Post()
    async adicionarCliente(@Body() body: any, @Res() res: Response): Promise<any> {
        const cliente = body;

        const clienteAdicionado = await this.clienteUseCase.adicionarCliente(cliente);

        return created(clienteAdicionado, res);
    }

    @Delete(':cpf')
    async removerClientePorCPF(@Param('cpf') cpf: string, @Res() res: Response): Promise<any> {
        await this.clienteUseCase.removerClientePorCpf(cpf);

        return noContent(res);
    }

    @Put(':cpf')
    async atualizarClientePorCPF(@Param('cpf') cpf: string, @Body() body: any, @Res() res: Response): Promise<any> {
        const cliente = body;

        cliente.cpf = cpf;

        const clienteAtualizado = await this.clienteUseCase.atualizarClientePorCpf(cliente);

        return ok(clienteAtualizado, res);
    }

    @Get()
    async obterClientes(@Res() res: Response): Promise<any> {
        const cliente = await this.clienteUseCase.obterClientes();

        return ok(cliente, res);
    }

    @Get(':cpf')
    async obterClientePorCPF(@Param('cpf') cpf: string, @Res() res: Response): Promise<any> {
        const cliente = await this.clienteUseCase.obterClientePorCpf(cpf);

        return ok(cliente, res);
    }
}
