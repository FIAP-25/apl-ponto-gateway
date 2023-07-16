import { Module } from '@nestjs/common';
import ApplicationModule from './application/application.module';
import DomainModule from './domain/domain.module';
import InfrastructureModule from './infrastructure/infrastructure.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
  ],
})
export class AppModule {}
