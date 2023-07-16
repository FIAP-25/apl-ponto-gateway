import { Module } from '@nestjs/common';
import ApplicationModule from './application/application.module';
import DomainModule from './domain/domain.module';
import InfrastructureModule from './infrastructure/infrastructure.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './infrastructure/entity/cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'fiap',
      entities: [ClienteEntity],
      synchronize: true,
    }),
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
  ],
})
export class AppModule {}
