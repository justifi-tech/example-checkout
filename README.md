# JustiFi Example Checkout

This is a thin example application, which you can run locally to see how to implement JustiFi PaymentJS (https://developer.justifi.ai/#tag/PaymentsJS) in a React application, as well as the backend which is needed to submit a payment to our API (https://developer.justifi.ai/#operation/CreatePayment). To run this application, you will need Node 15.20. 

You will also need your Test API Key, which can be generated here: https://app.justifi.ai/account/developers/api-keys. Once you have credentials, you will also need to create a test Seller Account (https://developer.justifi.ai/#operation/CreateSellerAccount), and get the id of the account. This account will be used to process our payment.

Once you have your client id, secret, and the seller account id, you can `cp src/config.json.example src/config.json` and replace the `clientId`, `clientSecret`, and `sellerAccountId` with your values. At this point you should be ready to process a sample payment with our app. The app is a simple checkout form which will pop up a JavaScript alert with a success payment.

## Dependency

This project has a dependency of Node 15.20.0 due to `node-sass` being used.

## Available Scripts

In the project directory, you can run:

### `yarn start:server`

Runs the Node/Express server which will handle payment processing calls (runs at [http://localhost:4200](http://localhost:4200)). In production and staging environments, this server will also serve up a react production build which is created by running `yarn build` (see section below).

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:4201](http://localhost:4201) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
