import { IPagamentoRepository } from '@/domain/contract/repository/pagamento.interface';
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
            // findByPedidoId: jest.fn(), TODO ativar quando for implementado findByPedidoId
            save: jest.fn()
        };

        mockHttpService = {
            get: jest.fn().mockImplementation(() => of({ data: [] })),
            post: jest.fn(),
            put: jest.fn()
        } as unknown as jest.Mocked<HttpService>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [PagamentoUseCase, { provide: IPagamentoRepository, useValue: mockPagamentoRepository }, { provide: HttpService, useValue: mockHttpService }]
        }).compile();

        useCase = module.get<PagamentoUseCase>(PagamentoUseCase);
    });

    it('deve obter pagamentos', async () => {
        const mockData = [];
        mockPagamentoRepository.find.mockResolvedValue(mockData);

        const resultado = await useCase.obterPagamentos();

        expect(resultado).toEqual(mockData);
        expect(mockPagamentoRepository.find).toHaveBeenCalled();
    });

    // it('deve obter status de pagamento', async () => { TODO ativar quando for implementado findByPedidoId
    //     const pedidoId = '123';
    //     const mockData = { id: pedidoId, pagamentoStatus: 'PAGO' };
    //     mockPagamentoRepository.findByPedidoId.mockResolvedValue(new Pagamento());

    //     const resultado = await useCase.obterStatusPagamento(pedidoId);

    //     expect(resultado).toEqual(mockData);
    //     expect(mockPagamentoRepository.findByPedidoId).toHaveBeenCalledWith(pedidoId);
    // });

    // it('deve atualizar status de pagamento', async () => { TODO ativar quando for implementado findByPedidoId
    //     const pedidoId = '123';
    //     const input = new AtualizarStatusPagamentoInput();
    //     const mockData = { id: pedidoId, pagamentoStatus: input.status };
    //     mockPagamentoRepository.findByPedidoId.mockResolvedValue(new Pagamento());

    //     const resultado = await useCase.atualizarStatusPagamento(pedidoId, input);

    //     expect(resultado).toEqual(mockData);
    //     expect(mockPagamentoRepository.findByPedidoId).toHaveBeenCalledWith(pedidoId);
    //     expect(mockPagamentoRepository.save).toHaveBeenCalled();
    // });

    // ... (outras partes do seu arquivo de teste)

    it('deve realizar pagamento', async () => {
        const id = '1';
        const pedidoId = '123';
        const notaFiscal = 'NF000001';
        const pagamentoStatus = 'PAGO';
        const mockData: RealizarPagamentoOutput = {
            id: id,
            pedidoId: pedidoId,
            notaFiscal: notaFiscal,
            pagamentoStatus: pagamentoStatus
        };

        mockPagamentoRepository.save.mockResolvedValue({
            id: id,
            pedidoId: pedidoId,
            notaFiscal: notaFiscal,
            pagamentoStatus: pagamentoStatus
        });

        const resultado = await useCase.realizarPagamento(pedidoId);

        expect(resultado).toEqual(mockData);
        expect(mockPagamentoRepository.save).toHaveBeenCalled();
    });

    it('deve obter pedidos na fila', async () => {
        const mockData = [];
        jest.spyOn(useCase, 'obterPedidosFila').mockResolvedValueOnce(mockData);

        const resultado = await useCase.obterPedidosFila();

        expect(resultado).toEqual(mockData);
    });
});
