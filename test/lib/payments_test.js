"use strict";
import should from 'should';
import co from 'co';
import mollie from '../../app';

describe('Payments', function () {
    const payments = mollie.payments;

    describe('.create', function () {
        const amount = 10.00;
        const description = 'Mollie ES6 module Test';
        const redirectUrl = 'http://example.org/order/12345';

        let check = 0;

        beforeEach(function() {
            check = 0;
        });

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
                    const local = true;
                    check = 1;
                    local.should.equal(false);
                } catch (error) {
                    error.should.have.property('error', 'Not all required parameters are given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no description is given', co.wrap(function*() {
                try {
                    yield payments.create(amount, null, redirectUrl);
                    const local = true;
                    local.should.equal(false);
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
                    const local = true;
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
        });
    });

    describe('.get', function () {

        describe('Errors', function () {

        });

        describe('Success', function() {

        })
    });
});
