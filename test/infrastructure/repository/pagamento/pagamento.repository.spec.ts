import { IPagamentoRepository } from '@/domain/contract/repository/pagamento.interface';
import { PagamentoEntity } from '@/infrastructure/entity/pagamento.entity';
import { PagamentoRepository } from '@/infrastructure/repository/pagamento/pagamento.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

jest.mock('@/application/mapper/base.mapper', () => ({
    mapper: {
        map: jest.fn().mockImplementation((entity) => entity),
        mapArray: jest.fn().mockImplementation((entities) => entities)
    }
}));

describe('PagamentoRepository', () => {
    let repository: IPagamentoRepository;
    let mockPagamentoEntityRepository: jest.Mocked<Repository<PagamentoEntity>>;

    beforeEach(async () => {
        mockPagamentoEntityRepository = {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn()
        } as unknown as jest.Mocked<Repository<PagamentoEntity>>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PagamentoRepository,
                {
                    provide: getRepositoryToken(PagamentoEntity),
                    useValue: mockPagamentoEntityRepository
                }
            ]
        }).compile();

        repository = module.get<IPagamentoRepository>(PagamentoRepository);
    });

    it('deve encontrar pagamentos', async () => {
        const mockPagamentos = [new PagamentoEntity(), new PagamentoEntity()];
        mockPagamentoEntityRepository.find.mockResolvedValue(mockPagamentos);

        const pagamentos = await repository.find();

        expect(pagamentos).toEqual(mockPagamentos);
        expect(mockPagamentoEntityRepository.find).toHaveBeenCalled();
    });

    // it('deve encontrar um pagamento pelo ID do pedido', async () => { TODO Ativar quando implementado
    //     const pedidoId = '123';
    //     const mockPagamento = new PagamentoEntity();
    //     mockPagamentoEntityRepository.findOneBy.mockResolvedValue(mockPagamento);

    //     const pagamento = await repository.findByPedidoId(pedidoId);

    //     expect(pagamento).toEqual(mockPagamento);
    //     expect(mockPagamentoEntityRepository.findOneBy).toHaveBeenCalledWith({ pedidoId: pedidoId });
    // });

    it('deve salvar um pagamento', async () => {
        // Cria um mock de PagamentoEntity em vez de Pagamento
        const mockPagamentoEntity = new PagamentoEntity();
        mockPagamentoEntityRepository.save.mockResolvedValue(mockPagamentoEntity);

        const resultado = await repository.save(mockPagamentoEntity);

        expect(resultado).toEqual(mockPagamentoEntity);
        expect(mockPagamentoEntityRepository.save).toHaveBeenCalledWith(mockPagamentoEntity);
    });
});
