import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class AutenticarInput {
    @AutoMap()
    @ApiProperty({ required: true })
    matricula: string;

    @AutoMap()
    @ApiProperty({ required: true })
    senha: string;
}

export class AutenticarOutput {
    @AutoMap()
    token: string;
}
