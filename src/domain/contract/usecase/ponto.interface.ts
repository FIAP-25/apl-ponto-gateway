import { MarcarPontoInput } from '@/infrastructure/dto/ponto/marcarPonto.dto';

export abstract class IPontoUseCase {
    abstract enviaRegistroFila(dados: MarcarPontoInput & { matricula: string }): Promise<void>;
}
