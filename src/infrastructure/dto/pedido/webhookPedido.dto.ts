import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class webhookPedido {
    @AutoMap()
    @ApiProperty({ required: true })
    id: string;

    @AutoMap()
    @ApiProperty({ required: true })
    aprovado: boolean;

    @AutoMap()
    @ApiProperty({ required: true })
    motivo: string;
}
