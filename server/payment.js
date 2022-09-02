var express = require('express');
var router = express.Router();
var axios = require('axios');
const config = require(process.env.CONFIG_PATH || '../src/config.json');
var { clientId, clientSecret, apiDomain, sellerAccountId } = config;

const creds = {
  client_id: clientId,
  client_secret: clientSecret,
};

const tokenRequest = function () {
  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
  return axios
    .post(`${apiDomain}/oauth/token`, creds, { headers: headers });
}


/* POST payment */
router.post('/', function (req, res, next) {
  tokenRequest().then((tokenResponse) => {
    const resquestOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': `example-checkout-${Math.floor(Date.now() / 1000)}`,
        'Authorization': `Bearer ${tokenResponse.data.access_token}`,
        'Seller-Account': `${sellerAccountId}`
      }
    };

    axios.post(`${apiDomain}/v1/payments`, req.body, resquestOptions)
      .then((paymentResponse) => { res.status(paymentResponse.status).send(paymentResponse.data); })
      .catch((error) => {
        console.error(error);
      });

  }).catch((tokenResponse) => {
    console.log('### tokenResponse', tokenResponse);
  });
});

module.exports = router;
