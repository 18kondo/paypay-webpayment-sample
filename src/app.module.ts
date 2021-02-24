import { Module } from '@nestjs/common';
import { PaypayModule } from './paypay/paypay.module';

@Module({
  imports: [PaypayModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
