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

        describe('Basics', function () {

            it('Should be a function', function () {
                payments.create.should.be.a.Function();
            });
        });

        describe('Errors', function () {
            it('An Object should be thrown', co.wrap(function *() {
                try {
                    yield payments.create();
                } catch (error) {
                    error.should.be.an.Object();
                    error.should.have.property('error');
                }
            }));

            it('Should throw an error if no amount is given', co.wrap(function*() {
                try {
                    yield payments.create(null, description, redirectUrl);
                } catch (error) {
                    error.should.have.property('error', 'Not all required parameters are given');
                }
            }));

            it('Should throw an error if no description is given', co.wrap(function*() {
                try {
                    yield payments.create(amount, null, redirectUrl);
                } catch (error) {
                    error.should.have.property('error', 'Not all required parameters are given');
                }
            }));

            it('Should throw an error if no redirectUrl is given', co.wrap(function*() {
                try {
                    yield payments.create(amount, description);
                } catch (error) {
                    error.should.have.property('error', 'Not all required parameters are given');
                }
            }));
        });

        describe('Success', function () {
            it('Should return an Object', co.wrap(function *() {
                try {
                    const payment = yield mollie.payments.create(amount, description, redirectUrl);
                    payment.should.be.an.Object();
                } catch (error) {
                    console.log(error);
                }
            }));

            it('Should have function getPaymentUrl which returns the paymentUrl', co.wrap(function *() {
                try {
                    const payment = yield mollie.payments.create(amount, description, redirectUrl);
                    payment.should.have.property('getPaymentUrl');
                    const url = payment.getPaymentUrl();
                    url.should.be.an.String();
                    url.should.equal(payment.links.paymentUrl)
                } catch (error) {
                    console.log(error);
                    console.log(error.stack);
                }
            }));
        });
    });
});
