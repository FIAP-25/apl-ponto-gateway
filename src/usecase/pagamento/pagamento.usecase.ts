import { mapper } from '@/application/mapper/base.mapper';
import { IPedidoClient } from '@/domain/client/pedido.client.interface';
import { IPagamentoRepository } from '@/domain/contract/repository/pagamento.interface';
import { IPagamentoUseCase } from '@/domain/contract/usecase/pagamento.interface';
import { Pagamento } from '@/domain/entity/pagamento.model';
import { CadastrarPagamentoOutput } from '@/infrastructure/dto/pagamento/cadastrarPagamento.dto';
import { ObterPagamentoOutput } from '@/infrastructure/dto/pagamento/obterPagamento.dto';
import { RealizarPagamentoOutput } from '@/infrastructure/dto/pagamento/realizarPagamento.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PagamentoUseCase implements IPagamentoUseCase {
    constructor(private pagamentoRepository: IPagamentoRepository, private pedidoClient: IPedidoClient) {}

    async obterPagamentos(): Promise<ObterPagamentoOutput[]> {
        const pagamentos = await this.pagamentoRepository.find();
        console.log('pagamentos: ', pagamentos);
        return mapper.mapArray(pagamentos, Pagamento, ObterPagamentoOutput);
    }

    async cadastrarPagamento(pedidoId: string): Promise<CadastrarPagamentoOutput> {
        const pagamento: Pagamento = {
            pedidoId: pedidoId,
            notaFiscal: '',
            pagamentoStatus: 'PENDENTE'
        };

        const pagamentoSalvo = await this.pagamentoRepository.save(pagamento);

        return mapper.map(pagamentoSalvo, Pagamento, CadastrarPagamentoOutput);
    }

    async realizarPagamento(pagamentoId: string): Promise<RealizarPagamentoOutput> {
        const pagamentoPendente: Pagamento = await this.pagamentoRepository.findByPagamentoId(pagamentoId);

        if (!pagamentoPendente) {
            throw new Error('pagamento-nao-encontrado');
        }

        pagamentoPendente.pagamentoStatus = 'PAGO';
        pagamentoPendente.notaFiscal = this.gerarNotaFiscal();

        const pagamentoSalvo = await this.pagamentoRepository.save(pagamentoPendente);

        this.pedidoClient.atualizarPedidoStatusPagamento(pagamentoSalvo.pedidoId, true, 'Pagamento realizado com sucesso');

        return mapper.map(pagamentoSalvo, Pagamento, RealizarPagamentoOutput);
    }

    private gerarNotaFiscal(): string {
        const numeroNotaFiscal = Math.floor(Math.random() * 1000000) + 1;
        const numeroNotaFiscalFormatado = numeroNotaFiscal.toString().padStart(6, '0');
        return `NF${numeroNotaFiscalFormatado}`;
    }
}
