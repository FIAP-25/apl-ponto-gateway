import { PagamentoEntity } from '@/infrastructure/entity/pagamento.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            // url: 'mongodb://root:example@mongo:27017/fiap?authSource=admin',
            type: 'mongodb',
            url: 'mongodb://localhost:27017/fiap?authSource=admin',
            // host: 'mongo',
            // username: 'root',
            // password: 'example',
            // database: 'fiap',
            // authSource: 'admin',
            // port: 27017,
            entities: [PagamentoEntity],
            synchronize: true
        })
    ]
})
export class ConnectionModule {}
