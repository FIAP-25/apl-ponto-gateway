import { IPagamentoUseCase } from '@/domain/contract/usecase/pagamento.interface';
import { AtualizarStatusPagamentoInput, AtualizarStatusPagamentoOutput } from '@/infrastructure/dto/pagamento/atualizarStatusPagamento.dto';
import { ObterStatusPagamentoOutput } from '@/infrastructure/dto/pagamento/obterStatusPagamento.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PagamentoUseCase implements IPagamentoUseCase {
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
}
