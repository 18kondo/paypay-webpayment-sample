import { Module } from '@nestjs/common';
import { PaypayController } from './paypay.controller';
import { PaypayService } from './paypay.service';

@Module({
  controllers: [PaypayController],
  providers: [PaypayService],
})
export class PaypayModule {}
