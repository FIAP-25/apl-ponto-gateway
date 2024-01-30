import { IAxiosClient } from '@/domain/contract/client/axios.interface';
import { IPagamentoRepository } from '@/domain/contract/repository/pagamento.interface';
import { Pagamento } from '@/domain/entity/pagamento.model';
import { ObterPagamentoOutput } from '@/infrastructure/dto/pagamento/obterPagamento.dto';
import { RealizarPagamentoOutput } from '@/infrastructure/dto/pagamento/realizarPagamento.dto';
import { PagamentoUseCase } from '@/usecase/pagamento/pagamento.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { Axios } from 'axios';
import { of } from 'rxjs';

describe('PagamentoUseCase', () => {
    let useCase: PagamentoUseCase;
    let mockPagamentoRepository: jest.Mocked<IPagamentoRepository>;
    let mockHttpService: jest.Mocked<IAxiosClient>;

    beforeEach(async () => {
        mockPagamentoRepository = {
            find: jest.fn(),
            findByPagamentoId: jest.fn(),
            findByPedidoId: jest.fn(),
            save: jest.fn(),
            update: jest.fn()
        };

        mockHttpService = {
            executarChamada: jest.fn()
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [PagamentoUseCase, { provide: IPagamentoRepository, useValue: mockPagamentoRepository }, { provide: IAxiosClient, useValue: mockHttpService }]
        }).compile();

        useCase = module.get<PagamentoUseCase>(PagamentoUseCase);
    });

    it('deve obter pagamentos', async () => {
        const id = '1';
        const pedidoId = '123';
        const notaFiscal = 'NF000001';
        const pagamentoStatus = 'PAGO';
        const mockData: ObterPagamentoOutput[] = [
            {
                id: id,
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

        const mockData: RealizarPagamentoOutput = {
            id: id,
            pedidoId: pedidoId,
            notaFiscal: notaFiscal,
            pagamentoStatus: pagamentoStatus
        };

        mockPagamentoRepository.findByPedidoId.mockResolvedValue({
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

        mockHttpService.executarChamada.mockResolvedValue({ 
            data: 'Mocked response data', 
            status: 200,             
            statusText: 'OK', 
            headers: {}, 
            config: {} 
        });

        const resultado = await useCase.realizarPagamento(pedidoId);

        expect(resultado).toEqual(mockData);
        expect(mockPagamentoRepository.findByPedidoId).toHaveBeenCalled();
        expect(mockPagamentoRepository.save).toHaveBeenCalled();
    });    
});
