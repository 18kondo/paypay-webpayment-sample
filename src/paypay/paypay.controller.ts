import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  CapturePaymentAuthorizationBody,
  CreateQrCodeBody,
  CreateQrCodeResponse,
  DeleteQrCodeParams,
  GetPaymentDetailsParams,
  RefundPaymentBody,
  RevertPaymentAuthorizationBody,
} from './paypay.interface';
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

  @Post('create-auth-qr-code')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateQrCodeResponse,
  })
  createAuthorizationQrCode(
    @Body() body: CreateQrCodeBody,
  ): Promise<CreateQrCodeResponse> {
    return this.paypayService.createAuthorizationQrCode(body);
  }

  @Delete('delete-qr-code/:codeId')
  deleteQrCode(@Param() params: DeleteQrCodeParams) {
    return this.paypayService.deleteQrCode(params.codeId);
  }

  @Get('get-payment-details/:merchantPaymentId')
  getPaymentDetails(@Param() params: GetPaymentDetailsParams) {
    return this.paypayService.getPaymentDetails(params.merchantPaymentId);
  }

  @Post('capture-payment-auth')
  capturePaymentAuthorization(@Body() body: CapturePaymentAuthorizationBody) {
    return this.paypayService.capturePaymentAuthorization(body);
  }

  @Post('revert-payment-auth')
  revertPaymentAuthorization(@Body() body: RevertPaymentAuthorizationBody) {
    return this.paypayService.revertPaymentAuthorization(body);
  }

  @Post('refund-payment')
  refundPayment(@Body() body: RefundPaymentBody) {
    return this.paypayService.refundPayment(body);
  }

  /**
   * webhook通知確認用
   */
  @Post('webhook')
  webhook(@Body() body: any) {
    console.log(body)
  }
}
