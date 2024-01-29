import { IAxiosClient } from '@/domain/contract/client/axios.interface';
import { IPagamentoRepository } from '@/domain/contract/repository/pagamento.interface';
import { Pagamento } from '@/domain/entity/pagamento.model';
import { PagamentoUseCase } from '@/usecase/pagamento/pagamento.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

describe('PagamentoUseCase', () => {
    let useCase: PagamentoUseCase;
    let mockPagamentoRepository: jest.Mocked<IPagamentoRepository>;
    let mockAxiosClient: jest.Mocked<IAxiosClient>;

    beforeEach(async () => {
        mockPagamentoRepository = {
            find: jest.fn(),
            findByPagamentoId: jest.fn(),
            save: jest.fn()
        };

        mockAxiosClient = {
            executarChamada: jest.fn().mockReturnValue(of({ data: 'resultado_mockado' }))
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [PagamentoUseCase, { provide: IPagamentoRepository, useValue: mockPagamentoRepository }, { provide: IAxiosClient, useValue: mockAxiosClient }]
        }).compile();

        useCase = module.get<PagamentoUseCase>(PagamentoUseCase);
    });

    it('deve obter pagamentos', async () => {
        const mockPagamentos: Pagamento[] = [];
        mockPagamentoRepository.find.mockResolvedValue(mockPagamentos);

        const resultado = await useCase.obterPagamentos();

        expect(resultado).toEqual([]);
        expect(mockPagamentoRepository.find).toHaveBeenCalled();
    });

    it('deve cadastrar pagamento', async () => {
        const pedidoId = '123';
        const mockPagamento: Pagamento = { pedidoId, notaFiscal: '', pagamentoStatus: 'PENDENTE' };
        mockPagamentoRepository.save.mockResolvedValue(mockPagamento);

        const resultado = await useCase.cadastrarPagamento(pedidoId);

        expect(resultado).toEqual({
            id: expect.any(String),
            notaFiscal: '',
            pagamentoStatus: 'PENDENTE',
            pedidoId: '123'
        });
        expect(mockPagamentoRepository.save).toHaveBeenCalledWith(mockPagamento);
    });

    it('deve realizar pagamento', async () => {
        const pagamentoId = '123';
        const mockPagamento: Pagamento = { pedidoId: pagamentoId, notaFiscal: 'NF000001', pagamentoStatus: 'PAGO' };
        mockPagamentoRepository.findByPagamentoId.mockResolvedValue(mockPagamento);
        mockPagamentoRepository.save.mockResolvedValue(mockPagamento);
        mockAxiosClient.executarChamada.mockResolvedValue(Promise.resolve({ data: 'resultado_mockado' }));

        const resultado = await useCase.realizarPagamento(pagamentoId);

        expect(resultado).toEqual({
            id: expect.any(String),
            notaFiscal: expect.stringMatching(/^NF\d{6}$/),
            pagamentoStatus: 'PAGO',
            pedidoId: '123'
        });
        expect(mockPagamentoRepository.findByPagamentoId).toHaveBeenCalledWith(pagamentoId);
        expect(mockPagamentoRepository.save).toHaveBeenCalledWith(mockPagamento);
        expect(mockAxiosClient.executarChamada).toHaveBeenCalled();
    });
});
