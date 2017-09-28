"use strict";
const {wrap} = require('co');
const Mollie = require('../../app');

describe('Payments', () => {
    let check = 0;
    let payment_id = null;

    let mollieOne;
    let mollieTwo;
    let keys;

    before(() => {
        keys = require(`${process.env.TEST_DIR}/test_keys`) || null;
    });

    beforeEach(() => {
        check = 0;

        mollieOne = new Mollie(process.env.MOLLIE_KEY || keys[0].key);
        if (keys.length > 0)
            mollieTwo = new Mollie(keys[1].key)
    });

    describe('.create', () => {
        const amount = 10.00;
        const description = 'Mollie ES6 module Test';
        const redirectUrl = 'http://example.org/order/12345';

        describe('Basics', () => {
            it('Should be a function', () => {
                mollieOne.payments.create.should.be.a.Function();
            });
        });

        describe('Errors', () => {
            it('An Object should be thrown', wrap(function* () {
                try {
                    yield mollieOne.payments.create();
                    check = 1;
                } catch (error) {
                    error.should.be.an.Object();
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no amount is given', wrap(function* () {
                try {
                    yield mollieOne.payments.create(null, description, redirectUrl);
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'Not all required parameters are given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no description is given', wrap(function* () {
                try {
                    yield mollieOne.payments.create(amount, null, redirectUrl);
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'Not all required parameters are given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no redirectUrl is given', wrap(function* () {
                try {
                    yield mollieOne.payments.create(amount, description);
                    local.should.equal(false);
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'Not all required parameters are given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if recurringType is set, but no customerID', wrap(function* () {
                try {
                    const payment = yield mollieOne.payments.create(
                        amount,
                        description,
                        redirectUrl,
                        {recurringType: 'first'}
                    );
                    payment.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if recurringType is not "first" or "recurring"', wrap(function* () {
                try {
                    const payment = yield mollieOne.payments.create(
                        amount,
                        description,
                        redirectUrl,
                        {
                            recurringType: 'amazing!!',
                            customerId: 'John Cena'
                        }
                    );
                    payment.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));
        });

        describe('Success', () => {
            it('Should return an Object', wrap(function* () {
                try {
                    const payment = yield mollieOne.payments.create(amount, description, redirectUrl);
                    payment.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have basic properties', wrap(function* () {
                try {
                    const payment = yield mollieOne.payments.create(amount, description, redirectUrl);

                    payment.should.have.property('id');
                    payment.should.have.property('status');
                    payment.should.have.property('amount');
                    payment.should.have.property('description');
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have function getPaymentUrl which returns the paymentUrl', wrap(function* () {
                try {
                    const payment = yield mollieOne.payments.create(amount, description, redirectUrl);
                    payment.should.have.property('getPaymentUrl');
                    const url = payment.getPaymentUrl();
                    url.should.be.an.String();
                    url.should.equal(payment.links.paymentUrl)
                    check = 1;
                } catch (error) {
                    console.log(error);
                    console.log(error.stack);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have function isPaid which returns false', wrap(function* () {
                try {
                    const payment = yield mollieOne.payments.create(amount, description, redirectUrl);
                    payment.should.have.property('isPaid');
                    const paid = payment.isPaid();
                    paid.should.be.a.Boolean();
                    paid.should.equal(false);
                    payment_id = payment.id;
                    check = 1;
                } catch (error) {
                    console.log(error);
                    console.log(error.stack);
                    check = 2;
                }
                check.should.equal(1);
            }));
        });
    });

    describe('.get', () => {

        describe('Basics', () => {
            it('Should be a function', () => {
                mollieOne.payments.get.should.be.a.Function();
            });
        });

        describe('Errors', () => {
            it('An Object should be thrown', wrap(function* () {
                try {
                    yield mollieOne.payments.get();
                    check = 1;
                } catch (error) {
                    error.should.be.an.Object();
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no id is given', wrap(function* () {
                try {
                    yield mollieOne.payments.get();
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'No id is given');
                    check = 2;
                }
                check.should.equal(2);
            }));
        });

        describe('Success', () => {
            it('Should return an Object', wrap(function* () {
                try {
                    const payment = yield mollieOne.payments.get(payment_id);
                    payment.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have basic properties', wrap(function* () {
                try {
                    const payment = yield mollieOne.payments.get(payment_id);

                    payment.should.have.property('id');
                    payment.should.have.property('status');
                    payment.should.have.property('amount');
                    payment.should.have.property('description');
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have function getPaymentUrl which returns the paymentUrl', wrap(function* () {
                try {
                    const payment = yield mollieOne.payments.get(payment_id);

                    payment.should.have.property('getPaymentUrl');
                    const url = payment.getPaymentUrl();
                    url.should.be.an.String();
                    url.should.equal(payment.links.paymentUrl)
                    check = 1;
                } catch (error) {
                    console.log(error);
                    console.log(error.stack);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have function isPaid, with various outcomes based on the status', wrap(function* () {
                try {
                    let payment = yield mollieOne.payments.get(payment_id);
                    payment.should.have.property('isPaid');
                    let paid = payment.isPaid();
                    paid.should.be.a.Boolean();
                    paid.should.equal(false);

                    payment.status = 'paid';
                    paid = payment.isPaid();
                    paid.should.be.a.Boolean();
                    paid.should.equal(true);

                    payment.status = 'paidout';
                    paid = payment.isPaid();
                    paid.should.be.a.Boolean();
                    paid.should.equal(true);

                    payment.status = 'expired';
                    paid = payment.isPaid();
                    paid.should.be.a.Boolean();
                    paid.should.equal(false);

                    check = 1;
                } catch (error) {
                    console.log(error);
                    console.log(error.stack);
                    check = 2;
                }
                check.should.equal(1);
            }));
        });
    });


    describe('.list', () => {
        const offset = 2;
        const count = 'Mollie ES6 module Test';

        describe('Basics', () => {
            it('Should be a function', () => {
                mollieOne.payments.list.should.be.a.Function();
            });
        });

        describe('Errors', () => {
            it('Should throw an error if a count of more than 250 is given', wrap(function* () {
                try {
                    yield mollieOne.payments.list({count: 251});
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'Count larger than 250 is not allowed');
                    check = 2;
                }
                check.should.equal(2);
            }));
        });

        describe('Success', () => {
            it('Should return an Object', wrap(function* () {
                try {
                    const payment = yield mollieOne.payments.list({count: 15});
                    payment.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should return certain fields', wrap(function* () {
                try {
                    const count = 10, offset = 2;
                    const payment = yield mollieOne.payments.list({count, offset});
                    payment.should.have.property('totalCount');
                    payment.should.have.property('offset', offset);
                    payment.should.have.property('count', count);
                    payment.should.have.property('data');
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should return payments with payment functions', wrap(function* () {
                try {
                    const payments = yield mollieOne.payments.list({count: 15});
                    const payment = payments.data[0];

                    payment.should.have.property('getPaymentUrl');
                    payment.should.have.property('isPaid');

                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should work without parameters', wrap(function* () {
                try {
                    const payment = yield mollieOne.payments.list();

                    payment.should.have.property('totalCount');
                    payment.should.have.property('offset');
                    payment.should.have.property('count');
                    payment.should.have.property('data');

                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));
        });
    });

});
