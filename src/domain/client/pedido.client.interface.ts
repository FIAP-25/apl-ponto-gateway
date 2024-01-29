export abstract class IPedidoClient {
    abstract atualizarPedidoStatusPagamento(pedidoId: string, aprovado: boolean, motivo: string): Promise<any>;
}
