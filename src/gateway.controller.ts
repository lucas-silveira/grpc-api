import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { GrpcMethod, ClientGrpc } from '@nestjs/microservices';
import { SummatorServiceClient } from './summator-client.interface';

interface AddRequest {
  a: number;
  b: number;
}

@Controller()
export class GatewayController implements OnModuleInit {
  private summatorClient: SummatorServiceClient;

  constructor(@Inject('SUMMATOR_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.summatorClient = this.client.getService<SummatorServiceClient>(
      'SummatorService',
    );
  }

  @GrpcMethod('GatewayService', 'Add')
  add(body: AddRequest) {
    return this.summatorClient.sum({ numbers: [body.a, body.b] }).toPromise();
  }
}
