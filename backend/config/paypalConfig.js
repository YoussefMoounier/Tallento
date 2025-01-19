// filepath: /d:/GitHub/Tallento/backend/config/paypalConfig.js
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

let clientId ="AUjSHi5e3Tykpv6xU-UQr0LPaqAadKq44SfQ66vwKqEZEi92RUZuCZHpk9I8DjbYPBxVgCcUu5M1yjoY";
let clientSecret = "EEsZi9ln7KlobkjXqC3o77kI6hnBh9g_fh6c0fqwWEMd1eGnlbi7uNCJRa-h_wcjooASnGk0tlfzV0cv";
// let clientId = process.env.PAYPAL_CLIENT_ID;
// let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

let environment = new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
let client = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

module.exports = { client };