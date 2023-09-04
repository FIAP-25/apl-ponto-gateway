import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Health')
@Controller('api/health')
export class HeatlhController {
    constructor() {}

    @Get()
    health(@Res() res: Response): any {
        const healthcheck: any = {
            uptime: process.uptime(),
            status: 'Online',
            timestamp: Date.now()
        };

        try {
            res.set('Cache-Control', 'no-cache').send(healthcheck);
        } catch (error) {
            healthcheck.status = error;
            res.status(503).send();
        }
    }
}
