import { ClienteEntity } from '@/infrastructure/entity/cliente.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './application/controller/cliente/cliente.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'fiap',
      entities: [ClienteEntity],
      synchronize: true,
    }),
    ClienteModule,
  ],
})
export class AppModule {}
