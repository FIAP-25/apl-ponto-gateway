import { PagamentoEntity } from '@/infrastructure/entity/pagamento.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            // url: 'mongodb://root:example@mongo:27017/fiap?authSource=admin',
            type: 'mongodb',
            host: 'mongo_pagamento',
            username: 'root',
            password: 'example',
            database: 'fiap',
            authSource: 'admin',
            port: 27019,
            entities: [PagamentoEntity],
            synchronize: true
        })
    ]
})
export class ConnectionModule {}
