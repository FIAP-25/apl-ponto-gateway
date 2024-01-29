import axios from 'axios';
import { IPedidoClient } from './pedido.client.interface';

export class PedidoClient implements IPedidoClient {
    async atualizarPedidoStatusPagamento(pedidoId: string, aprovado: boolean, motivo: string): Promise<any> {
        (async () => {
            await axios
                .post(`http://node_produto:4000/api/pedidos/webhook/`, {
                    id: pedidoId,
                    aprovado: aprovado,
                    motivo: motivo
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        })();
    }
}
