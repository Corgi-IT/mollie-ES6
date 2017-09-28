"use strict";
const {wrap} = require('co');
const Mollie = require('../../app');


describe('Refunds', () => {
    let check = 0;
    let refunds_id = null;

    let mollieOne;
    let keys;

    before(wrap(function *() {
        if (process.env.MOLLIE_KEY)
            keys = [{key: process.env.MOLLIE_KEY}];
        else
            keys = require(`${process.env.TEST_DIR}/test_keys`);

        mollieOne = new Mollie(keys[0].key);

        try {
            const payments_list = yield mollieOne.payments.list();
            refunds_id = payments_list.data[0].id;
        } catch (e) {
            console.log('Error getting paymentslist before Refunds tests');
            console.log(e);
            console.log(e.stack);
        }
    }));

    beforeEach(() => {
        check = 0;

        mollieOne = new Mollie(keys[0].key);
    });

    describe('.create', () => {
        const amount = 2.00;

        describe('Basics', () => {
            it('Should be a function', () => {
                mollieOne.refunds.create.should.be.a.Function();
            });
        });

        describe('Errors', () => {
            it('An Object should be thrown', wrap(function *() {
                try {
                    yield mollieOne.refunds.create();
                    check = 1;
                } catch (error) {
                    error.should.be.an.Object();
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if id amount is given', wrap(function*() {
                try {
                    yield mollieOne.refunds.create();
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'Not all required parameters are given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no valid id is given', wrap(function*() {
                try {
                    yield mollieOne.refunds.create('invalidId');
                    check = 1;
                } catch (error) {
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));

        });

        describe('Success', () => {
            /**
             * We've had contact with Mollie and they informed us that
             * it's not possible to write unit tests for this functionality.
             * With the current structure, I can't quite see how to write unit tests for this functionality,
             * apart from overwriting the object returned by mollie.refunds.create.
             * If someone has a better idea about this, please submit a pull request :)
             */
        });
    });

    describe('.get', () => {

        describe('Basics', () => {
            it('Should be a function', () => {
                mollieOne.refunds.get.should.be.a.Function();
            });
        });

        describe('Errors', () => {
            it('An Object should be thrown', wrap(function *() {
                try {
                    yield mollieOne.refunds.get();
                    check = 1;
                } catch (error) {
                    error.should.be.an.Object();
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no paymentId is given', wrap(function*() {
                try {
                    yield mollieOne.refunds.get(null, 'someId');
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'No paymentId or refundId is given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no refundId is given', wrap(function*() {
                try {
                    yield mollieOne.refunds.get('someId', null);
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'No paymentId or refundId is given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no valid ids are given', wrap(function*() {
                try {
                    yield mollieOne.refunds.get('invalidId', 'invalidId');
                    check = 1;
                } catch (error) {
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));
        });

        describe('Success', () => {
            /**
             * Since it's not possible to create a refund,
             * it's also not possible to test the success outcomes
             * of the get functionality
             * If someone has a better idea about this, please submit a pull request :)
             */
        });
    });

    describe('.list', () => {
        const count = 'Mollie ES6 module Test';

        describe('Basics', () => {
            it('Should be a function', () => {
                mollieOne.refunds.list.should.be.a.Function();
            });
        });

        describe('Errors', () => {
            it('Should throw an error if no id is given', wrap(function*() {
                try {
                    yield mollieOne.refunds.list(null, {count: 251});
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'No id is given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if a count of more than 250 is given', wrap(function*() {
                try {
                    yield mollieOne.refunds.list('someId', {count: 251});
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'Count larger than 250 is not allowed');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no valid id is given', wrap(function*() {
                try {
                    yield mollieOne.refunds.list('invalidId');
                    check = 1;
                } catch (error) {
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));
        });

        describe('Success', () => {
            /**
             * Since it's not possible to create a refund,
             * it's also not possible to test the success outcomes
             * of the get functionality
             * If someone has a better idea about this, please submit a pull request :)
             */
        });
    });

    describe('.cancel', () => {

        describe('Basics', () => {
            it('Should be a function', () => {
                mollieOne.refunds.cancel.should.be.a.Function();
            });
        });

        describe('Errors', () => {
            it('An Object should be thrown', wrap(function *() {
                try {
                    yield mollieOne.refunds.cancel();
                    check = 1;
                } catch (error) {
                    error.should.be.an.Object();
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no paymentId is given', wrap(function*() {
                try {
                    yield mollieOne.refunds.cancel(null, 'someId');
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'No paymentId or refundId is given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no refundId is given', wrap(function*() {
                try {
                    yield mollieOne.refunds.cancel('someId', null);
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'No paymentId or refundId is given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no valid id is given', wrap(function*() {
                try {
                    yield mollieOne.refunds.cancel('invalidId', 'invalidId');
                    check = 1;
                } catch (error) {
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));
        });

        describe('Success', () => {
            /**
             * Since it's not possible to create a refund,
             * it's also not possible to test the success outcomes
             * of the get functionality
             * If someone has a better idea about this, please submit a pull request :)
             */
        });
    });
});
