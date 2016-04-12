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

#### List ####

```ES6
    const options = {
        count: 10,
        offset: 5
    }
    try {
        const methods_list = yield mollie.methods.list(options);
        /*
        methods_list = {
            totalCount: Number,
            offset:     Number,
            count:      Number,
            data:       [Methods],
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

#### Get ####

```ES6
    const amount = 100.00;
    const method_id = 'creditcard';

    try {
        const method = yield mollie.methods.get(method_id);
        if(method.getMinAmount() < amount && method.getMaxAmount > amount) {
            // Allow user to check out
        }
    } catch (e) {
        // Handle error
    }
```
### Issuers ###

This part is iDEAL only.
Using issuers makes it possible to integrate the bank choice in your own system.

#### List ####

```ES6
    const options = {
        count: 20,
        offset: 2
    }
    try {
        const issuers_list = yield mollie.issuers.list(options);
        /*
        issuers_list = {
            totalCount: Number,
            offset:     Number,
            count:      Number,
            data:       [Issuers],
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

#### Get ####

```ES6
    const issuer_id = 'ideal_ABNANL2A';

    try {
        const issuer = yield mollie.issuers.get(issuer_id);
        // Do something with this issuer
    } catch (e) {
        // Handle error
    }
```

### Refunds ###

#### Create ####

```ES6
    try {
        const refund_id = 'some_id';
        const amount = 5.00; // This is optional, if omitted,
                             // the full amount will be refunded
        const refund = yield mollie.refunds.create(refund_id, amount);
    } catch (e) {
        // Handle error
    }
```

#### Get ####

```ES6
    const payment_id = 'payment_id';
    const refund_id = 'refund_id'
    try {
        const refund = yield mollie.refunds.get(payment_id, refund_id);
        if(refund.payment.isFullyRefunded()) {
            console.log('Payment is fully refunded');
        }
    } catch (e) {
        // Handle error
    }
```

#### List ####

```ES6
    const payment_id = 'payment_id';
    const options = {
        count: 10,
        offset: 2
    }
    try {
        const payments_list = yield mollie.refunds.list(payment_id, options);
    } catch (e) {
        // Handle error
    }
```

#### Cancel ####

```ES6
    const payment_id = 'payment_id';
    const refund_id = 'refund_id'
    try {
        const refund = yield mollie.refunds.cancel(payment_id, refund_id);
    } catch (e) {
        // Handle error
    }
```


