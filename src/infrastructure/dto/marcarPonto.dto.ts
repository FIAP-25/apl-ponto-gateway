import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class MarcarPontoInput {
    @AutoMap()
    @ApiProperty({ required: true })
    matricula: string;

    @AutoMap()
    @ApiProperty({ required: true })
    latitude: number;

    @AutoMap()
    @ApiProperty({ required: true })
    longitude: number;
}
