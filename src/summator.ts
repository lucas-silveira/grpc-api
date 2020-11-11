import path from 'path';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SummatorModule } from './summator.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SummatorModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:50052',
        package: 'summator',
        protoPath: path.resolve(__dirname, '../summator-service-api.proto'),
      },
    },
  );
  await app.listen(() => {
    console.log('Summator service has started');
  });
}

bootstrap();
