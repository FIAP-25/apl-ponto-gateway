import { Injectable } from '@nestjs/common';

@Injectable()
export class ClienteService {
  obterClientePorCpf(cpf: string): string {
    return `Cliente ${cpf}!`;
  }
}
