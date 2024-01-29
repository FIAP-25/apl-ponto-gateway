type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export abstract class IAxiosClient {
    abstract executarChamada(metodo: HttpMethod, url: string, body?: any): Promise<any>;
}
