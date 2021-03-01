import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQrCodeBody {
  @ApiProperty({ example: 100, description: '金額' })
  amount: number;

  @ApiPropertyOptional({ description: '取引の説明' })
  orderDescription?: string;
}

export class CreateQrCodePayload {
  merchantPaymentId: string;
  amount: {
    amount: number;
    currency: 'JPY';
  };
  codeType: 'ORDER_QR';
  orderDescription?: string;
  isAuthorization?: boolean;
  authorizationExpiry?: number;
  redirectUrl?: string; // リダイレクト先のURL
  redirectType?: 'WEB_LINK';
}

export class CreateQrCodeResponse {
  resultInfo: {
    code: string;
    message: string;
    codeId: string;
  };
  data: {
    codeId: string;
    url: string;
    deeplink: string;
    expiryDate: number;
    merchantPaymentId: string;
    amount: Record<string, unknown>;
    orderDescription: string;
    orderItems: [
      {
        name: string;
        category: string;
        quantity: number;
        productId: string;
        unitPrice: {
          amount: number;
          currency: 'JPY';
        };
      },
    ];
    metadata: Record<string, unknown>;
    codeType: 'ORDER_QR';
    storeInfo: string;
    storeId: string;
    terminalId: string;
    requestedAt: number;
    redirectUrl: string;
    redirectType: 'WEB_LINK';
    isAuthorization: true;
    authorizationExpiry: null;
  };
}

export class DeleteQrCodeParams {
  @ApiProperty({ description: 'QRコードID' })
  codeId: string;
}

export class GetPaymentDetailsParams {
  @ApiProperty({ description: '加盟店発番のユニークな決済トランザクションID' })
  merchantPaymentId: string;
}

export class CapturePaymentAuthorizationBody {
  @ApiProperty({ description: '加盟店発番のユニークな決済トランザクションID' })
  merchantPaymentId: string;

  @ApiProperty({ example: 100, description: '金額' })
  amount: number;

  @ApiPropertyOptional({ description: 'エポックタイムスタンプ（秒単位）' })
  requestedAt?: number;

  @ApiPropertyOptional({ description: 'キャプチャの説明' })
  orderDescription?: string;
}

export class RevertPaymentAuthorizationBody {
  @ApiProperty({ description: 'PayPay発番の決済トランザクションID' })
  paymentId: string;

  @ApiPropertyOptional({ description: 'エポックタイムスタンプ（秒単位）' })
  requestedAt?: number;

  @ApiPropertyOptional({ description: 'オプション' })
  reason?: string;
}

export class RefundPaymentBody {
  @ApiProperty({ description: 'PayPay発番の決済トランザクションID' })
  paymentId: string;

  @ApiProperty({ example: 100, description: '金額' })
  amount: number;

  @ApiPropertyOptional({ description: '補足' })
  reason?: string;
}

export class RefundPaymentPayload {
  merchantRefundId: string;
  paymentId: string;
  amount: {
    amount: number;
    currency: 'JPY';
  };
  reason?: string;
}
