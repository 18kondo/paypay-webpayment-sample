import { Injectable } from '@nestjs/common';
import * as paypay from '@paypayopa/paypayopa-sdk-node';
import { v4 as uuidv4 } from 'uuid';
import {
  CapturePaymentAuthorizationBody,
  CreateQrCodeBody,
  CreateQrCodePayload,
  CreateQrCodeResponse,
  RefundPaymentBody,
  RefundPaymentPayload,
  RevertPaymentAuthorizationBody,
} from './paypay.interface';

@Injectable()
export class PaypayService {
  private readonly API_KEY = process.env.API_KEY;
  private readonly API_SECRET = process.env.API_SECRET;
  private readonly MERCHANT_ID = process.env.MERCHANT_ID;
  private readonly FRONTEND_PATH =
    process.env.FRONTEND_PATH || 'http://localhost:3000/swagger';

  constructor() {
    paypay.Configure({
      clientId: this.API_KEY,
      clientSecret: this.API_SECRET,
      merchantId: this.MERCHANT_ID,
      productionMode: false,
    });
  }

  createQrCode(body: CreateQrCodeBody): Promise<CreateQrCodeResponse> {
    const paymentId = uuidv4();
    const payload: CreateQrCodePayload = {
      merchantPaymentId: paymentId,
      amount: {
        amount: body.amount,
        currency: 'JPY',
      },
      codeType: 'ORDER_QR',
      orderDescription: body.orderDescription,
      redirectUrl: `${this.FRONTEND_PATH}`,
      redirectType: 'WEB_LINK',
    };

    return new Promise<CreateQrCodeResponse>((resolve) => {
      paypay.QRCodeCreate(payload, (paypayResponse: any) => {
        console.log(paypayResponse);
        resolve(paypayResponse);
      });
    });
  }

  createAuthorizationQrCode(
    body: CreateQrCodeBody,
  ): Promise<CreateQrCodeResponse> {
    const paymentId = uuidv4();
    const payload: CreateQrCodePayload = {
      merchantPaymentId: paymentId,
      amount: {
        amount: body.amount,
        currency: 'JPY',
      },
      codeType: 'ORDER_QR',
      orderDescription: body.orderDescription,
      redirectUrl: `${this.FRONTEND_PATH}`,
      redirectType: 'WEB_LINK',
      isAuthorization: true,
    };

    return new Promise<CreateQrCodeResponse>((resolve) => {
      paypay.QRCodeCreate(payload, (paypayResponse: any) => {
        console.log(paypayResponse);
        resolve(paypayResponse);
      });
    });
  }

  deleteQrCode(codeId: string) {
    return new Promise((resolve) => {
      paypay.QRCodeDelete([codeId], (paypayResponse: any) => {
        console.log(paypayResponse);
        resolve(paypayResponse);
      });
    });
  }

  getPaymentDetails(merchantPaymentId: string) {
    return new Promise((resolve) => {
      paypay.GetPaymentDetails([merchantPaymentId], (paypayResponse: any) => {
        console.log(paypayResponse);
        resolve(paypayResponse);
      });
    });
  }

  capturePaymentAuthorization(body: CapturePaymentAuthorizationBody) {
    const merchantCaptureId = uuidv4();
    const payload = {
      merchantPaymentId: body.merchantPaymentId,
      amount: {
        amount: body.amount,
        currency: 'JPY',
      },
      merchantCaptureId,
      orderDescription: body.orderDescription
    };

    return new Promise((resolve) => {
      paypay.PaymentAuthCapture(payload, (paypayResponse: any) => {
        console.log(paypayResponse);
        resolve(paypayResponse);
      });
    });
  }

  revertPaymentAuthorization(body: RevertPaymentAuthorizationBody) {
    const merchantRevertId = uuidv4();
    const payload = {
      merchantRevertId,
      paymentId: body.paymentId,
    };

    return new Promise((resolve) => {
      paypay.PaymentAuthRevert(payload, (paypayResponse: any) => {
        console.log(paypayResponse);
        resolve(paypayResponse);
      });
    });
  }

  refundPayment(body: RefundPaymentBody) {
    const merchantRefundId = uuidv4();
    const payload: RefundPaymentPayload = {
      merchantRefundId,
      paymentId: body.paymentId,
      amount: {
        amount: body.amount,
        currency: 'JPY',
      },
    };

    return new Promise((resolve) => {
      paypay.PaymentRefund(payload, (paypayResponse: any) => {
        console.log(paypayResponse);
        resolve(paypayResponse);
      });
    });
  }
}
