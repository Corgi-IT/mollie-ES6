![Mollie](https://www.mollie.nl/files/Mollie-Logo-Style-Small.png)

# Mollie API client in ES6 #
Mollie API client written in ES6 by an official Mollie Partner.

[![Build Status](https://travis-ci.org/Geexteam/mollie-ES6.svg?branch=master)](https://travis-ci.org/Geexteam/mollie-ES6)
[![Dependency Status](https://gemnasium.com/badges/github.com/Geexteam/mollie-ES6.svg)](https://gemnasium.com/github.com/Geexteam/mollie-ES6)
[![NSP Status](https://nodesecurity.io/orgs/geex-team/projects/d754a489-8e72-4566-81fb-334cba2ae1c1/badge)](https://nodesecurity.io/orgs/geex-team/projects/d754a489-8e72-4566-81fb-334cba2ae1c1)

## Requirements ##
To use the this module, the following is required:

+ Node.js v6.0.0 or higher
+ You can [Sign up](https://www.mollie.com/en/signup/2269941) here for free.
+ If you need any help with setting it up, just contact us [@GeeX_dev](https://twitter.com/GeeX_dev) on twitter 
or mail us at [development@geex.company](mailto:development@geex.company?subject=MollieES6%20Help)

## Installation ##

You can install this module with NPM:

    npm install --save mollie-es6

## Getting started ##
*Examples are in Express.js*

Require the library.
```ES6
    const Mollie = require('mollie-es6');
```

Initialize
```ES6
    const mollieApp = new Mollie('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM');
```

All callback functions are now generatos.
You can call .next() on them or when using something like [co](https://www.npmjs.com/package/co), you can just add `yield` in a `try / catch`, like in the examples below.

Create a new payment.
```ES6
    co.wrap(function*() {
        const amount = 10.00;
        const description = 'My first API payment';
        const redirectUrl = 'https://example.org/order/12345';
        try {
            const payment = yield mollieApp.payments.create(
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
        const paymentId = 'paymentId';
        try {
            const payment = yield mollieApp.payments.get(paymentId);
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
    const redirectUrl = 'https://example.org/order/12345';
    try {
        const payment = yield mollieApp.payments.create(
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
    const redirectUrl = 'https://example.org/order/12345';
    try {
        const payment = yield mollieApp.payments.create(
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
    const paymentId = 'paymentId';
    const options = {
        method: 'creditcard'
    };
    try {
        const payment = yield mollieApp.payments.get(paymentId, options);
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
        const payments_list = yield mollieApp.payments.list(options);
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
        const methods_list = yield mollieApp.methods.list(options);
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
    const methodId = 'creditcard';

    try {
        const method = yield mollieApp.methods.get(methodId);
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
        const issuers_list = yield mollieApp.issuers.list(options);
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
    const issuerId = 'ideal_ABNANL2A';

    try {
        const issuer = yield mollieApp.issuers.get(issuerId);
        // Do something with this issuer
    } catch (e) {
        // Handle error
    }
```

### Refunds ###

#### Create ####

```ES6
    try {
        const refundId = 'someId';
        const amount = 5.00; // This is optional, if omitted,
                             // the full amount will be refunded
        const refund = yield mollieApp.refunds.create(refundId, amount);
    } catch (e) {
        // Handle error
    }
```

#### Get ####

```ES6
    const paymentId = 'paymentId';
    const refundId = 'refundId'
    try {
        const refund = yield mollieApp.refunds.get(paymentId, refundId);
        if(refund.payment.isFullyRefunded()) {
            console.log('Payment is fully refunded');
        }
    } catch (e) {
        // Handle error
    }
```

#### List ####

```ES6
    const paymentId = 'paymentId';
    const options = {
        count: 10,
        offset: 2
    }
    try {
        const payments_list = yield mollieApp.refunds.list(paymentId, options);
    } catch (e) {
        // Handle error
    }
```

#### Cancel ####

```ES6
    const paymentId = 'paymentId';
    const refundId = 'refundId'
    try {
        const refund = yield mollieApp.refunds.cancel(paymentId, refundId);
    } catch (e) {
        // Handle error
    }
```

### Customers ###

#### Create ####

##### Normal #####
```ES6
    try {
        const customer = yield mollieApp.customers.create(
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
    const customerId = 'someId';
    try {
        const customer = yield mollieApp.customers.get(customerId);
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
        const customer_list = yield mollieApp.customers.list(options);
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

