export abstract class IPedidoClient {
    abstract atualizarPedidoStatusPagamento(pedidoId: string, status: string): Promise<any>;
}
