import { PagamentoController } from '@/application/controller/pagamento/pagamento.controller';
import { IPagamentoUseCase } from '@/domain/contract/usecase/pagamento.interface';
import { AtualizarStatusPagamentoInput, AtualizarStatusPagamentoOutput } from '@/infrastructure/dto/pagamento/atualizarStatusPagamento.dto';
import { ObterPagamentoOutput } from '@/infrastructure/dto/pagamento/obterPagamento.dto';
import { ObterStatusPagamentoOutput } from '@/infrastructure/dto/pagamento/obterStatusPagamento.dto';
import { RealizarPagamentoOutput } from '@/infrastructure/dto/pagamento/realizarPagamento.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';

describe('PagamentoController', () => {
    let controller: PagamentoController;
    let mockPagamentoUseCase: jest.Mocked<IPagamentoUseCase>;
    let response: jest.Mocked<Response>;

    beforeEach(async () => {
        mockPagamentoUseCase = {
            obterPagamentos: jest.fn(),
            obterStatusPagamento: jest.fn(),
            atualizarStatusPagamento: jest.fn(),
            realizarPagamento: jest.fn(),
            obterPedidosFila: jest.fn()
        };

        response = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as unknown as jest.Mocked<Response>;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [PagamentoController],
            providers: [{ provide: IPagamentoUseCase, useValue: mockPagamentoUseCase }]
        }).compile();

        controller = module.get<PagamentoController>(PagamentoController);
    });

    it('deve obter pagamentos', async () => {
        const mockData: ObterPagamentoOutput[] = [];
        mockPagamentoUseCase.obterPagamentos.mockResolvedValue(mockData);

        await controller.obterPagamentos(response);

        expect(mockPagamentoUseCase.obterPagamentos).toHaveBeenCalled();
        expect(response.json).toHaveBeenCalledWith({ dados: mockData });
    });

    it('deve obter status do pagamento pelo id do pedido', async () => {
        const pedidoId = '123';
        const mockData: ObterStatusPagamentoOutput = {
            id: pedidoId,
            pagamentoStatus: 'pagamento_pendente'
        };
        mockPagamentoUseCase.obterStatusPagamento.mockResolvedValue(mockData);

        await controller.obterStatusPagamento(pedidoId, response);

        expect(mockPagamentoUseCase.obterStatusPagamento).toHaveBeenCalledWith(pedidoId);
        expect(response.json).toHaveBeenCalledWith({ dados: mockData });
    });

    it('deve atualizar status do pagamento pelo id do pedido', async () => {
        const pedidoId = '123';
        const input = new AtualizarStatusPagamentoInput();
        const mockData: AtualizarStatusPagamentoOutput = {
            id: pedidoId,
            pagamentoStatus: 'pagamento_pendente'
        };
        mockPagamentoUseCase.atualizarStatusPagamento.mockResolvedValue(mockData);

        await controller.atualizarStatusPagamento(pedidoId, input, response);

        expect(mockPagamentoUseCase.atualizarStatusPagamento).toHaveBeenCalledWith(pedidoId, input);
        expect(response.json).toHaveBeenCalledWith({ dados: mockData });
    });

    it('deve pagar um pedido', async () => {
        const pedidoId = '123';
        const mockData: RealizarPagamentoOutput = {
            pedidoId: pedidoId,
            notaFiscal: '123123123',
            pagamentoStatus: 'pagamento_pendente'
        };
        mockPagamentoUseCase.realizarPagamento.mockResolvedValue(mockData);

        await controller.pagarPedido(pedidoId, response);

        expect(mockPagamentoUseCase.realizarPagamento).toHaveBeenCalledWith(pedidoId);
        expect(response.json).toHaveBeenCalledWith({ dados: mockData });
    });

    // it('deve obter pedidos na fila', async () => { TODO Precisa realizar tipagem para retorno de obterPedidosFila e não any[]
    //     const mockData = Array();
    //     mockPagamentoUseCase.obterPagamentos.mockResolvedValue(mockData);

    //     await controller.obterPedidosFila(response);

    //     expect(mockPagamentoUseCase.obterPedidosFila).toHaveBeenCalled();
    //     expect(response.json).toHaveBeenCalledWith({ dados: mockData });
    // });
});
