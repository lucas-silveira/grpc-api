import path from 'path';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GatewayModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:50051',
        package: 'gateway',
        protoPath: path.resolve(__dirname, '../gateway-service-api.proto'),
      },
    },
  );
  await app.listen(() => {
    console.log('Gateway service has started');
  });
}

bootstrap();
