import { Module } from '@nestjs/common';
import { SummatorController } from './summator.controller';

@Module({
  controllers: [SummatorController],
})
export class SummatorModule {}
