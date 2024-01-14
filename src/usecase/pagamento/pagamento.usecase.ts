import { IPagamentoRepository } from '@/domain/contract/repository/pagamento.interface';
import { IPagamentoUseCase } from '@/domain/contract/usecase/pagamento.interface';
import { Pagamento } from '@/domain/entity/pagamento.model';
import { AtualizarStatusPagamentoInput, AtualizarStatusPagamentoOutput } from '@/infrastructure/dto/pagamento/atualizarStatusPagamento.dto';
import { ObterStatusPagamentoOutput } from '@/infrastructure/dto/pagamento/obterStatusPagamento.dto';
import { RealizarPagamentoOutput } from '@/infrastructure/dto/pagamento/realizarPagamento.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PagamentoUseCase implements IPagamentoUseCase {
    constructor(private pagamentoRepository: IPagamentoRepository) {}
    async obterStatusPagamento(pedidoId: string): Promise<ObterStatusPagamentoOutput> {
        // const pedido: Pedido = await this.pedidoRepository.findById(pedidoId);

        // return mapper.map(pedido, Pedido, ObterStatusPagamentoOutput);

        return {
            id: pedidoId,
            pagamentoStatus: 'PAGO'
        };
    }

    async atualizarStatusPagamento(pedidoId: string, input: AtualizarStatusPagamentoInput): Promise<AtualizarStatusPagamentoOutput> {
        // const pedido: Pedido = await this.pedidoRepository.findById(pedidoId);

        // if (!pedido) {
        //     throw new ErroNegocio('pedido-nao-existe');
        // }

        // pedido.pagamentoStatus = input.status;

        // const pedidoAtualizado = await this.pedidoRepository.save(pedido);

        // return mapper.map(pedidoAtualizado, Pedido, AtualizarStatusPagamentoOutput);

        return {
            id: pedidoId,
            pagamentoStatus: input.status
        };
    }

    async realizarPagamento(pedidoId: string): Promise<RealizarPagamentoOutput> {
        const notaFiscal = this.gerarNotaFiscal();
        const pagamento: Pagamento = {
            id: '',
            pedidoId: pedidoId,
            notaFiscal: notaFiscal,
            pagamentoStatus: 'PAGO'
        };

        console.log(pagamento);
        this.pagamentoRepository.save(pagamento);

        return {
            id: pedidoId,
            notaFiscal: 'NF123456'
        };
    }

    private gerarNotaFiscal(): string {
        const numeroNotaFiscal = Math.floor(Math.random() * 1000000) + 1;
        const numeroNotaFiscalFormatado = numeroNotaFiscal.toString().padStart(6, '0');
        return `NF${numeroNotaFiscalFormatado}`;
    }
}
