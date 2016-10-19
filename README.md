![Mollie](http://www.mollie.nl/files/Mollie-Logo-Style-Small.png)
# Mollie API client in ES6 #
Mollie API client written in ES6 by an official Mollie Partner / Reseller.

## Requirements ##
To use the this module, the following is required:

+ Node.js v6.0.0 or higher
+ You can [Sign up](https://www.mollie.com/en/signup/2269941) here for free.
+ If you need any help with setting it up, just contact us [@GeeX_dev](https://twitter.com/GeeX_dev) on twitter

## Installation ##

You can install this module with NPM:

    npm install --save mollie-es6

## Getting started ##
*Examples are in Express.js*

Require the library.
```ES6
    const mollie = require('mollie-es6');
```

Set the basics needed
```ES6
    mollie.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM';
```

All callback functions are now generatos.
You can call .next() on them or when using something like [co](https://www.npmjs.com/package/co), you can just add `yield` in a `try / catch`, like in the examples below.

Create a new payment.
```ES6
    co.wrap(function*() {
        const amount = 10.00;
        const description = 'My first API payment';
        const redirectUrl = 'http://example.org/order/12345';
        try {
            const payment = yield mollie.payments.create(
                amount,
                description,
                redirectUrl
            );
            res.redirect(payment.getPaymentUrl());
        } catch (e) {
            // Handle error
        }
    });
```

Retrieving a payment.
```ES6
    co.wrap(function*() {
        const payment_id = 'payment_id';
        try {
            const payment = yield mollie.payments.get(payment_id);
            if(payment.isPaid()) {
                console.log('Payment is fulfilled');
            }
        } catch (e) {
            // Handle error
        }
    });
```

## Implemented Functions ##

### Payments ###

#### Create ####

##### Normal #####
```ES6
    const amount = 10.00;
    const description = 'My first API payment';
    const redirectUrl = 'http://example.org/order/12345';
    try {
        const payment = yield mollie.payments.create(
            amount,
            description,
            redirectUrl
        );
        res.redirect(payment.getPaymentUrl());
    } catch (e) {
        // Handle error
    }
```

##### Recurring #####
```ES6
    const amount = 10.00;
    const description = 'My first API recurring payment';
    const redirectUrl = 'http://example.org/order/12345';
    try {
        const payment = yield mollie.payments.create(
            amount,
            description,
            redirectUrl,
            {
                recurringType: 'first' || 'recurring',
                customerId: 'John Cena'
            }
        );
        res.redirect(payment.getPaymentUrl());
    } catch (e) {
        // Handle error
    }
```

#### Get ####

```ES6
    const payment_id = 'payment_id';
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

### Customers ###

#### Create ####

##### Normal #####
```ES6
    try {
        const customer = yield mollie.customers.create(
            'Customer name',
            'info@domain.tld',
            {locale: 'en', metadata: {something: 'here'}}
        );
        // New customer created, do something fun with it
    } catch (e) {
        // Handle error
    }
```

#### Get ####

```ES6
    const customer_id = 'some_id';
    try {
        const customer = yield mollie.customers.get(customer_id);
        // Do something with this customer data
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
        const customer_list = yield mollie.customers.list(options);
        /*
        customer_list = {
            totalCount: Number,
            offset:     Number,
            count:      Number,
            data:       [Customers],
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

