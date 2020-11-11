import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import path from 'path';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SUMMATOR_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'summator',
          protoPath: path.resolve(__dirname, '../summator-service-api.proto'),
          url: 'localhost:50052',
        },
      },
    ]),
  ],
  controllers: [GatewayController],
})
export class GatewayModule {}
