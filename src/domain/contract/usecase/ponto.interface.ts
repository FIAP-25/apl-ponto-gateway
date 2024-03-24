export abstract class IPontoUseCase {
    abstract enviaRegistroFila(dados: MarcarPontoInput): Promise<void>;
}
