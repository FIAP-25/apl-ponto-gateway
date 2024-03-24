import ApplicationModule from '@/application/application.module';
import InfrastructureModule from '@/infrastructure/infrastructure.module';
import UseCaseModule from '@/usecase/usecase.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ApplicationModule,
        InfrastructureModule,
        UseCaseModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '600s' }
        })
    ],
    providers: []
})
export class ServerModule {}
