import { Test, TestingModule } from '@nestjs/testing';
import { PaypayController } from './paypay.controller';

describe('PaypayController', () => {
  let controller: PaypayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaypayController],
    }).compile();

    controller = module.get<PaypayController>(PaypayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
