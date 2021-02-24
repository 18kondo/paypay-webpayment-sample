import { Test, TestingModule } from '@nestjs/testing';
import { PaypayService } from './paypay.service';

describe('PaypayService', () => {
  let service: PaypayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaypayService],
    }).compile();

    service = module.get<PaypayService>(PaypayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
