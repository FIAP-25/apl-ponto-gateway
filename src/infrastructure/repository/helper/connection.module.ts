import { PagamentoEntity } from '@/infrastructure/entity/pagamento.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: 'mongo',
            username: 'root',
            password: 'example',
            port: 27017,
            database: 'fiap',
            entities: [PagamentoEntity],
            synchronize: true
        })
    ]
})
export class ConnectionModule {}
