import { IAxiosClient } from '@/domain/contract/client/axios.interface';
import { IPontoUseCase } from '@/domain/contract/usecase/ponto.interface';
import { MarcarPontoInput } from '@/infrastructure/dto/marcarPonto.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Client } from '@nestjs/microservices/external/nats-client.interface';

@Injectable()
export class PontoUseCase implements IPontoUseCase {
    constructor(private axiosClient: IAxiosClient, @Inject('PONTO_SERVICE') private readonly client: ClientProxy) {}

    async enviaRegistroFila(dados: MarcarPontoInput): Promise<void> {
        this.client.emit('ponto_created', dados);
        return new Promise(function (resolve) {
            setTimeout(resolve);
        });
    }

    // async obterPagamentos(): Promise<ObterPagamentoOutput[]> {
    //     const pagamentos = await this.pagamentoRepository.find();
    //     return mapper.mapArray(pagamentos, Pagamento, ObterPagamentoOutput);
    // }

    // async cadastrarPagamento(pedidoId: string): Promise<CadastrarPagamentoOutput> {
    //     const pagamento: Pagamento = {
    //         pedidoId: pedidoId,
    //         notaFiscal: '',
    //         pagamentoStatus: 'PENDENTE'
    //     };

    //     const pagamentoSalvo = await this.pagamentoRepository.save(pagamento);

    //     return mapper.map(pagamentoSalvo, Pagamento, CadastrarPagamentoOutput);
    // }

    // async realizarPagamento(pedidoId: string): Promise<RealizarPagamentoOutput> {
    //     const pagamentoPendente: Pagamento = await this.pagamentoRepository.findByPedidoId(pedidoId);

    //     if (!pagamentoPendente) {
    //         throw new Error('pagamento-nao-encontrado');
    //     }

    //     pagamentoPendente.pagamentoStatus = 'PAGO';
    //     pagamentoPendente.notaFiscal = this.gerarNotaFiscal();

    //     const pagamentoSalvo = await this.pagamentoRepository.save(pagamentoPendente);

    //     await this.pagamentoWebhook(pedidoId, true, 'Pagamento realizado com sucesso');

    //     return mapper.map(pagamentoSalvo, Pagamento, RealizarPagamentoOutput);
    // }

    // async pagamentoWebhook(pedidoId: string, sucesso: boolean, motivo: string): Promise<void> {
    //     await this.axiosClient
    //         .executarChamada('patch', `pedidos/webhook`, { id: pedidoId, aprovado: sucesso, motivo: motivo })
    //         .then((resultado) => {
    //             console.log('resultado: ', resultado);
    //         })
    //         .catch((erro) => {
    //             console.error('erro: ', erro);
    //         });
    // }

    // private gerarNotaFiscal(): string {
    //     const numeroNotaFiscal = Math.floor(Math.random() * 1000000) + 1;
    //     const numeroNotaFiscalFormatado = numeroNotaFiscal.toString().padStart(6, '0');
    //     return `NF${numeroNotaFiscalFormatado}`;
    // }
}
