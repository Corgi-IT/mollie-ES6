"use strict";
import should from 'should';
import co from 'co';
import mollie from '../../app';


describe('Refunds', function () {
    let check = 0;
    let refunds_id = null;

    before(co.wrap(function *() {
        const payments = mollie.payments;
        try {
            const payments_list = yield payments.list();
            refunds_id = payments_list.data[0].id;
        } catch (e) {
            console.log('Error getting paymentslist before Refunds tests');
            console.log(e);
            console.log(e.stack);
        }
    }));

    beforeEach(function () {
        check = 0;
    });

    describe('.create', function () {
        const amount = 2.00;

        describe('Basics', function () {
            it('Should be a function', function () {
                mollie.refunds.create.should.be.a.Function();
            });
        });

        describe('Errors', function () {
            it('An Object should be thrown', co.wrap(function *() {
                try {
                    yield mollie.refunds.create();
                    check = 1;
                } catch (error) {
                    error.should.be.an.Object();
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if id amount is given', co.wrap(function*() {
                try {
                    yield mollie.refunds.create();
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'Not all required parameters are given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no valid id is given', co.wrap(function*() {
                try {
                    yield mollie.refunds.create('invalid_id');
                    check = 1;
                } catch (error) {
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));

        });

        describe('Success', function () {
            /**
             * We've had contact with Mollie and they informed us that
             * it's not possible to write unit tests for this functionality.
             * With the current structure, I can't quite see how to write unit tests for this functionality,
             * apart from overwriting the object returned by mollie.refunds.create.
             * If someone has a better idea about this, without adjusting the code, please submit a pull request :)
             */
        });
    });

    describe('.get', function () {

        describe('Basics', function () {
            it('Should be a function', function () {
                mollie.refunds.get.should.be.a.Function();
            });
        });

        describe('Errors', function () {
            it('An Object should be thrown', co.wrap(function *() {
                try {
                    yield mollie.refunds.get();
                    check = 1;
                } catch (error) {
                    error.should.be.an.Object();
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no payment_id is given', co.wrap(function*() {
                try {
                    yield mollie.refunds.get(null, 'some_id');
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'No payment_id or refund_id is given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no refund_id is given', co.wrap(function*() {
                try {
                    yield mollie.refunds.get('some_id', null);
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'No payment_id or refund_id is given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no valid ids are given', co.wrap(function*() {
                try {
                    yield mollie.refunds.get('invalid_id', 'invalid_id');
                    check = 1;
                } catch (error) {
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));
        });

        describe('Success', function () {
            /**
             * Since it's not possible to create a refund,
             * it's also not possible to test the success outcomes
             * of the get functionality
             * If someone has a better idea about this, without adjusting the code, please submit a pull request :)
             */
        });
    });

    describe('.list', function () {
        const count = 'Mollie ES6 module Test';

        describe('Basics', function () {
            it('Should be a function', function () {
                mollie.refunds.list.should.be.a.Function();
            });
        });

        describe('Errors', function () {
            it('SShould throw an error if no id is given', co.wrap(function*() {
                try {
                    yield mollie.refunds.list(null, {count: 251});
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'No id is given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if a count of more than 250 is given', co.wrap(function*() {
                try {
                    yield mollie.refunds.list('some_id', {count: 251});
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'Count larger than 250 is not allowed');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no valid id is given', co.wrap(function*() {
                try {
                    yield mollie.refunds.list('invalid_id');
                    check = 1;
                } catch (error) {
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));
        });

        describe('Success', function () {
            /**
             * Since it's not possible to create a refund,
             * it's also not possible to test the success outcomes
             * of the get functionality
             * If someone has a better idea about this, without adjusting the code, please submit a pull request :)
             */
        });
    });

    describe('.cancel', function () {

        describe('Basics', function () {
            it('Should be a function', function () {
                mollie.refunds.cancel.should.be.a.Function();
            });
        });

        describe('Errors', function () {
            it('An Object should be thrown', co.wrap(function *() {
                try {
                    yield mollie.refunds.cancel();
                    check = 1;
                } catch (error) {
                    error.should.be.an.Object();
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no payment_id is given', co.wrap(function*() {
                try {
                    yield mollie.refunds.cancel(null, 'some_id');
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'No payment_id or refund_id is given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no refund_id is given', co.wrap(function*() {
                try {
                    yield mollie.refunds.cancel('some_id', null);
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'No payment_id or refund_id is given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no valid id is given', co.wrap(function*() {
                try {
                    yield mollie.refunds.cancel('invalid_id', 'invalid_id');
                    check = 1;
                } catch (error) {
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));
        });

        describe('Success', function () {
            /**
             * Since it's not possible to create a refund,
             * it's also not possible to test the success outcomes
             * of the get functionality
             * If someone has a better idea about this, without adjusting the code, please submit a pull request :)
             */
        });
    });
});
