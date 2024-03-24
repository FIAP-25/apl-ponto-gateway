import { MarcarPontoInput } from '@/infrastructure/dto/marcarPonto.dto';

export abstract class IPontoUseCase {
    abstract enviaRegistroFila(dados: MarcarPontoInput): Promise<void>;
}
