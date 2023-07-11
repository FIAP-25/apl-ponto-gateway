import { NestFactory } from '@nestjs/core';
import { ClienteModule } from './application/controller/cliente/cliente.module';

async function bootstrap() {
  const app = await NestFactory.create(ClienteModule);
  await app.listen(3000);
}
bootstrap();
