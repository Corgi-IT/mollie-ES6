# Mollie ES6 API client for Node.js #
Mollie API made ready for ES6 usage.

*You can see a list of implemented functions at the bottom.*
*Till Version 1.0.0, this is WIP*

## Requirements ##
To use the Mollie API client, the following things are required:

+ Node.js v4.4.2 or higher
+ You can [Sign up](https://www.mollie.com/en/signup/2269941) here for free.

## Installation ##

You can install this module with NPM:

    npm install mollie-es6

## Getting started ##
*Examples are in Express.js*

Import the library.
```ES6
    import mollie from 'mollie-es6';
```

Set the basics needed
```ES6
    mollie.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM';
```

All callback functions now return promises,
which you can either `yield` in a `try / catch` or resolve it`foo.then().catch()`

Create a new payment.
```ES6
    try {
        const payment = yield mollie.payments.create({
            amount:      10.00,
            description: "My first API payment",
            redirectUrl: "https://webshop.com/api/payments/response"
        });
        res.redirect(payment.getPaymentUrl());
    } catch (e) {
        // Handle error
    }
```

Retrieving a payment.
```ES6
    try {
        const payment = yield mollie.payments.get(payment.id);
        if(payment.isPaid()) {
            console.log('Payment is paid');
        }
    } catch (e) {
        // Handle error
    }
```

## Implemented Functions ##

### Payments ###

| Functionality |Implemented    |
|:-------------:|:-------------:|
| Create        | Yes           |
| Get           | Yes           |
| List          | Yes           |

### Methods ###

| Functionality |Implemented    |
|:-------------:|:-------------:|
| List          | No            |
| Get           | No            |

### Issuer ###

| Functionality |Implemented    |
|:-------------:|:-------------:|
| List          | No            |
| Get           | No            |

### Refunds ###

| Functionality |Implemented    |
|:-------------:|:-------------:|
| Create        | No            |
| Get           | No            |
| List          | No            |
| Cancel        | No            |


