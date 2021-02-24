import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateQrCodeBody, CreateQrCodeResponse, DeleteQrCodeParams, GetPaymentDetails, RefundPaymentBody } from './paypay.interface';
import { PaypayService } from './paypay.service';

@Controller('paypay')
export class PaypayController {
  constructor(private paypayService: PaypayService) {}

  @Post('create-qr-code')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateQrCodeResponse,
  })
  createQrCode(@Body() body: CreateQrCodeBody): Promise<CreateQrCodeResponse> {
    return this.paypayService.createQrCode(body);
  }

  @Delete('delete-qr-code/:codeId')
  deleteQrCode(@Param() params: DeleteQrCodeParams) {
    return this.paypayService.deleteQrCode(params.codeId);
  }

  @Get('get-payment-details/:merchantPaymentId')
  getPaymentDetails(@Param() params: GetPaymentDetails) {
    return this.paypayService.getPaymentDetails(params.merchantPaymentId);
  }

  @Post('refund-payment')
  refundPayment(@Body() body: RefundPaymentBody) {
    return this.paypayService.refundPayment(body);
  }
}
