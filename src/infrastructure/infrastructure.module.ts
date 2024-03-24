import { AxiosClient } from '@/domain/client/axios.client';
import { IAxiosClient } from '@/domain/contract/client/axios.interface';
import { Module } from '@nestjs/common';
@Module({
    imports: [],
    providers: [{ provide: IAxiosClient, useClass: AxiosClient }],
    exports: [IAxiosClient]
})
export default class InfrastructureModule {}
