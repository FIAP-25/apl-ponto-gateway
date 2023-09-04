import { mapper } from '@/application/mapper/base.mapper';
import { IPedidoRepository } from '@/domain/contract/repository/pedido.interface';
import { IPagamentoUseCase } from '@/domain/contract/usecase/pagamento.interface';
import { Pedido } from '@/domain/entity/pedido.model';
import { ErroNegocio } from '@/domain/exception/erro.module';
import { AtualizarStatusPagamentoInput, AtualizarStatusPagamentoOutput } from '@/infrastructure/dto/pagamento/atualizarStatusPagamento.dto';
import { ObterStatusPagamentoOutput } from '@/infrastructure/dto/pagamento/obterStatusPagamento.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PagamentoUseCase implements IPagamentoUseCase {
    constructor(private pedidoRepository: IPedidoRepository) {}

    async obterStatusPagamento(pedidoId: string): Promise<ObterStatusPagamentoOutput> {
        const pedido: Pedido = await this.pedidoRepository.findById(pedidoId);

        return mapper.map(pedido, Pedido, ObterStatusPagamentoOutput);
    }

    async atualizarStatusPagamento(pedidoId: string, input: AtualizarStatusPagamentoInput): Promise<AtualizarStatusPagamentoOutput> {
        const pedido: Pedido = await this.pedidoRepository.findById(pedidoId);

        if (!pedido) {
            throw new ErroNegocio('pedido-nao-existe');
        }

        pedido.pagamentoStatus = input.status;

        const pedidoAtualizado = await this.pedidoRepository.save(pedido);

        return mapper.map(pedidoAtualizado, Pedido, AtualizarStatusPagamentoOutput);
    }
}
