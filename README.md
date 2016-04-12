# Mollie ES6 API client for Node.js #
Mollie API made ready for ES6 usage.

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
    const payment_id = 'some_id';
    try {
        const payment = yield mollie.payments.get(payment_id);
        if(payment.isPaid()) {
            console.log('Payment is paid');
        }
    } catch (e) {
        // Handle error
    }
```

## Implemented Functions ##

### Payments ###

#### Create ####

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

#### Get ####

```ES6
    const payment_id = 'some_id';
    const options = {
        method: 'creditcard'
    };
    try {
        const payment = yield mollie.payments.get(payment_id, options);
        if(payment.isPaid()) {
            console.log('Payment is paid');
        }
    } catch (e) {
        // Handle error
    }
```

#### List ####

```ES6
    const options = {
        count: 100,
        offset: 200
    }
    try {
        const payments_list = yield mollie.payments.list(options);
        /*
        payments_list = {
            totalCount: Number,
            offset:     Number,
            count:      Number,
            data:       [Payments],
            links: {
                first:      String(url),
                previous:   String(url),
                next:       String(url),
                last:       String(url)
            }
        }
        */
    } catch (e) {
        // Handle error
    }
```

### Methods ###

| Functionality |Implemented    |
|:-------------:|:-------------:|
| List          | Yes           |
| Get           | Yes           |

### Issuer ###

| Functionality |Implemented    |
|:-------------:|:-------------:|
| List          | Yes           |
| Get           | Yes           |

### Refunds ###

| Functionality |Implemented    |
|:-------------:|:-------------:|
| Create        | Yes           |
| Get           | Yes           |
| List          | Yes           |
| Cancel        | Yes           |


