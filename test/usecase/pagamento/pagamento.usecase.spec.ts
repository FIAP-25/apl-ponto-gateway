import { PedidoClient } from '@/domain/client/pedido.client';
import { IPedidoClient } from '@/domain/client/pedido.client.interface';
import { IPagamentoRepository } from '@/domain/contract/repository/pagamento.interface';
import { Pagamento } from '@/domain/entity/pagamento.model';
import { RealizarPagamentoOutput } from '@/infrastructure/dto/pagamento/realizarPagamento.dto';
import { PagamentoUseCase } from '@/usecase/pagamento/pagamento.usecase';
import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

describe('PagamentoUseCase', () => {
    let useCase: PagamentoUseCase;
    let mockPagamentoRepository: jest.Mocked<IPagamentoRepository>;
    let mockHttpService: jest.Mocked<HttpService>;

    beforeEach(async () => {
        mockPagamentoRepository = {
            find: jest.fn(),
            findByPagamentoId: jest.fn(),
            save: jest.fn()
        };

        mockHttpService = {
            get: jest.fn().mockImplementation(() => of({ data: [] })),
            post: jest.fn(),
            put: jest.fn()
        } as unknown as jest.Mocked<HttpService>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [PagamentoUseCase, { provide: IPagamentoRepository, useValue: mockPagamentoRepository }, { provide: HttpService, useValue: mockHttpService }, { provide: IPedidoClient, useClass: PedidoClient }]
        }).compile();

        useCase = module.get<PagamentoUseCase>(PagamentoUseCase);
    });

    it('deve obter pagamentos', async () => {
        const id = '1';
        const pedidoId = '123';
        const notaFiscal = 'NF000001';
        const pagamentoStatus = 'PAGO';
        const mockData: Pagamento[] = [
            {
                _id: id,
                pedidoId: pedidoId,
                notaFiscal: notaFiscal,
                pagamentoStatus: pagamentoStatus
            }
        ];

        mockPagamentoRepository.find.mockResolvedValue([
            {
                _id: id,
                pedidoId: pedidoId,
                notaFiscal: notaFiscal,
                pagamentoStatus: pagamentoStatus
            }
        ]);

        const resultado = await useCase.obterPagamentos();

        expect(resultado).toEqual(mockData);
        expect(mockPagamentoRepository.find).toHaveBeenCalled();
    });

    it('deve realizar pagamento', async () => {
        const id = '1';
        const pedidoId = '123';
        const notaFiscal = 'NF000001';
        const pagamentoStatus = 'PAGO';

        const mockData: Pagamento = {
            _id: id,
            pedidoId: pedidoId,
            notaFiscal: notaFiscal,
            pagamentoStatus: pagamentoStatus
        };

        mockPagamentoRepository.findByPagamentoId.mockResolvedValue({
            _id: id,
            pedidoId: pedidoId,
            notaFiscal: notaFiscal,
            pagamentoStatus: pagamentoStatus
        });

        mockPagamentoRepository.save.mockResolvedValue({
            _id: id,
            pedidoId: pedidoId,
            notaFiscal: notaFiscal,
            pagamentoStatus: pagamentoStatus
        });

        const resultado = await useCase.realizarPagamento(pedidoId);

        expect(resultado).toEqual(mockData);
        expect(mockPagamentoRepository.findByPagamentoId).toHaveBeenCalled();
        expect(mockPagamentoRepository.save).toHaveBeenCalled();
    });

    it('deve obter um pagamento por Id', async () => {
        const id = '1';
        const pedidoId = '123';
        const notaFiscal = 'NF000001';
        const pagamentoStatus = 'PAGO';

        const mockData: Pagamento = {
            _id: id,
            pedidoId: pedidoId,
            notaFiscal: notaFiscal,
            pagamentoStatus: pagamentoStatus
        };

        mockPagamentoRepository.findByPagamentoId.mockResolvedValue({
            _id: id,
            pedidoId: pedidoId,
            notaFiscal: notaFiscal,
            pagamentoStatus: pagamentoStatus
        });

        const resultado = await useCase.realizarPagamento(pedidoId);

        expect(resultado).toEqual(mockData);
        expect(mockPagamentoRepository.findByPagamentoId).toHaveBeenCalled();
    });
});
