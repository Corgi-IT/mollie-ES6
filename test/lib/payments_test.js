"use strict";
import should from 'should';
import co from 'co';
import mollie from '../../app';

describe('Payments', function () {
    const payments = mollie.payments;
    let check = 0;
    let payment_id = null;

    beforeEach(function () {
        check = 0;
    });

    describe('.create', function () {
        const amount = 10.00;
        const description = 'Mollie ES6 module Test';
        const redirectUrl = 'http://example.org/order/12345';

        describe('Basics', function () {
            it('Should be a function', function () {
                payments.create.should.be.a.Function();
            });
        });

        describe('Errors', function () {
            it('An Object should be thrown', co.wrap(function *() {
                try {
                    yield payments.create();
                    check = 1;
                } catch (error) {
                    error.should.be.an.Object();
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no amount is given', co.wrap(function*() {
                try {
                    yield payments.create(null, description, redirectUrl);
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'Not all required parameters are given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no description is given', co.wrap(function*() {
                try {
                    yield payments.create(amount, null, redirectUrl);
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'Not all required parameters are given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no redirectUrl is given', co.wrap(function*() {
                try {
                    yield payments.create(amount, description);
                    local.should.equal(false);
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'Not all required parameters are given');
                    check = 2;
                }
                check.should.equal(2);
            }));
        });

        describe('Success', function () {
            it('Should return an Object', co.wrap(function *() {
                try {
                    const payment = yield mollie.payments.create(amount, description, redirectUrl);
                    payment.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have basic properties', co.wrap(function *() {
                try {
                    const payment = yield mollie.payments.create(amount, description, redirectUrl);

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

            it('Should have function getPaymentUrl which returns the paymentUrl', co.wrap(function *() {
                try {
                    const payment = yield mollie.payments.create(amount, description, redirectUrl);
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

            it('Should have function isPaid which returns false', co.wrap(function *() {
                try {
                    const payment = yield mollie.payments.create(amount, description, redirectUrl);
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

    describe('.get', function () {

        describe('Basics', function () {
            it('Should be a function', function () {
                payments.get.should.be.a.Function();
            });
        });

        describe('Errors', function () {
            it('An Object should be thrown', co.wrap(function *() {
                try {
                    yield payments.get();
                    check = 1;
                } catch (error) {
                    error.should.be.an.Object();
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no id is given', co.wrap(function*() {
                try {
                    yield payments.get();
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'No id is given');
                    check = 2;
                }
                check.should.equal(2);
            }));
        });

        describe('Success', function () {
            it('Should return an Object', co.wrap(function *() {
                try {
                    const payment = yield mollie.payments.get(payment_id);
                    payment.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have basic properties', co.wrap(function *() {
                try {
                    const payment = yield mollie.payments.get(payment_id);

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

            it('Should have function getPaymentUrl which returns the paymentUrl', co.wrap(function *() {
                try {
                    const payment = yield mollie.payments.get(payment_id);

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

            it('Should have function isPaid, with various outcomes based on the status', co.wrap(function *() {
                try {
                    let payment = yield mollie.payments.get(payment_id);
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


    describe('.list', function () {
        const offset = 2;
        const count = 'Mollie ES6 module Test';

        describe('Basics', function () {
            it('Should be a function', function () {
                payments.list.should.be.a.Function();
            });
        });

        describe('Errors', function () {
            it('Should throw an error if a count of more than 250 is given', co.wrap(function*() {
                try {
                    yield payments.list({count: 251});
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'Count larger than 250 is not allowed');
                    check = 2;
                }
                check.should.equal(2);
            }));
        });

        describe('Success', function () {
            it('Should return an Object', co.wrap(function *() {
                try {
                    const payment = yield mollie.payments.list({count: 15});
                    payment.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should return certain fields', co.wrap(function *() {
                try {
                    const payment = yield mollie.payments.list({count: 15});
                    payment.should.have.property('totalCount')
                    payment.should.have.property('offset')
                    payment.should.have.property('count')
                    payment.should.have.property('data')
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should return payments with payment functions', co.wrap(function *() {
                try {
                    const payments = yield mollie.payments.list({count: 15});
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
        });
    });

});
