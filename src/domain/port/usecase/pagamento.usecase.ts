import { Pedido } from "@/domain/entity/pedido.model";
import { ErroNegocio } from "@/domain/exception/erro.module";
import { AtualizarStatusPagamentoInput } from "@/infrastructure/dto/pagamento/atualizarStatusPagamento.dto";
import { PedidoRepository } from "@/infrastructure/repository/pedido/pedido.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PagamentoUseCase {
    constructor(private pedidoRepository: PedidoRepository) {}

    async atualizarStatusPagamento(pedidoId: string, input: AtualizarStatusPagamentoInput): Promise<Pedido> {
        const pedido: Pedido = await this.pedidoRepository.findById(pedidoId)

        if(!pedido) {
            throw new ErroNegocio('pedido-nao-existe');
        }

        pedido.pagamentoStatus = input.status

        const pedidoAtualizado = await this.pedidoRepository.save(pedido)

        return pedidoAtualizado
    }
}
