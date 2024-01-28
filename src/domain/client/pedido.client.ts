import axios from 'axios';
import { IPedidoClient } from './pedido.client.interface';

export class PedidoClient implements IPedidoClient {
    async atualizarPedidoStatusPagamento(pedidoId: string, status: string): Promise<any> {
        (async () => {
            await axios
                .post(`http://node_produto:4000/api/produtos/status/${pedidoId}`, {
                    status: status
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
