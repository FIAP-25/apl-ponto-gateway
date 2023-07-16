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
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_SCHEMA,
      entities: [ClienteEntity],
      synchronize: true,
    }),
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
  ],
})
export class AppModule {}
