# PayPay Webpayment Sample

## Installation

```sh
$ npm install
```

## env

```sh
$ export API_KEY="REPLACE_WITH_YOUR_API_KEY"
$ export API_SECRET="REPLACE_WITH_YOUR_SECRET_KEY"
$ export MERCHANT_ID="REPLACE_WITH_YOUR_MERCHANT_ID"
```


## Running the app

```sh
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API

### Swagger 

ローカルホストでサーバ起動中に閲覧可能

http://localhost:3000/swagger

## Webhook

ngrok を使用して検証
https://ngrok.com/

### Install

```sh
$ brew install ngrok
```

### 実行

```sh
$ ngrok http 3000
```

Forwarding されたURLをPayPay内の `ダッシュボード > 設定 > 各Webhook` へ設定

ex) http://XXXXXX.ngrok.io/paypay/webhook

決済のステータスが変更されるとWebhookが実行される。
https://www.paypay.ne.jp/opa/doc/jp/v1.0/dynamicqrcode#tag/Webhook
