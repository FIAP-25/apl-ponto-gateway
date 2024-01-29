import axios from 'axios';
import { IAxiosClient } from '../contract/client/axios.interface';

export class AxiosClient implements IAxiosClient {
    urlBase = process.env.URL_BASE ?? '';

    async executarChamada(metodo: 'get' | 'post' | 'put' | 'patch' | 'delete', path: string, body?: any): Promise<any> {
        const url = `${this.urlBase}${path}`;
        switch (metodo) {
            case 'get':
                return await axios.get(url);
            case 'post':
                return await axios.post(url, body);
            case 'put':
                return await axios.put(url, body);
            case 'patch':
                return await axios.patch(url, body);
            case 'delete':
                return await axios.delete(url);
            default:
                break;
        }
    }
}
