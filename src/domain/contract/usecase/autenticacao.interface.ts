import { Autenticacao } from '@/domain/entity/autenticacao.model';
import { AutenticarInput } from '@/infrastructure/dto/autenticacao/autenticar.dto';

export abstract class IAutenticacaoUseCase {
    abstract autenticarUsuario(input: AutenticarInput): Promise<Autenticacao | null>;
}
