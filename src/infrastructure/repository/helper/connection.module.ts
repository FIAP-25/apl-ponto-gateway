import { ClienteEntity } from '@/infrastructure/entity/cliente.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      username: 'root',
      password: 'root',
      database: 'fiap',
      port: 3306,
      entities: [ClienteEntity],
      synchronize: true,
    }),
  ],
})
export class ConnectionModule {}
