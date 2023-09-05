import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class AtualizarStatusPagamentoInput {
    @AutoMap()
    @ApiProperty({ required: true })
    status: string;
}

export class AtualizarStatusPagamentoOutput {
    @AutoMap()
    id: string;

    @AutoMap()
    pagamentoStatus: string;
}
