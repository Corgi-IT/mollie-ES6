"use strict";
const {wrap} = require('co');
const Mollie = require('../../app');

describe('Customers', () => {
    let mollieOne;
    let mollieTwo;
    let keys;

    let check = 0;
    let customer_id = null;

    const name = 'GeeX';
    const email = 'development@geex.company';
    const metadata = {
        company_name: 'GeeX',
        test: true
    };
    const locale = 'nl';

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
        describe('Basics', () => {
            it('Should be a function', () => {
                mollieOne.customers.create.should.be.a.Function();
            });
        });

        describe('Errors', () => {
            it('An Object should be thrown', wrap(function* () {
                try {
                    yield mollieOne.customers.create();
                    check = 1;
                } catch (error) {
                    error.should.be.an.Object();
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no name is given', wrap(function* () {
                try {
                    yield mollieOne.customers.create(null, email);
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'Not all required parameters are given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no email is given', wrap(function* () {
                try {
                    yield mollieOne.customers.create(name, null);
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'Not all required parameters are given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if a non-accepted locale is set', wrap(function* () {
                try {
                    yield mollieOne.customers.create(name, email, {locale: 'dutch'});
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
                    const customer = yield mollieOne.customers.create(name, email);
                    customer.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have basic properties', wrap(function* () {
                try {
                    const customer = yield mollieOne.customers.create(name, email, {
                        locale,
                        metadata: 'Is a customer made with unitTests'
                    });

                    customer.should.have.property('id');
                    customer.should.have.property('name', name);
                    customer.should.have.property('email', email);
                    customer.should.have.property('recentlyUsedMethods');
                    customer.should.have.property('createdDatetime');
                    check = 1;

                    customer_id = customer.id;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));
        });
    });

    describe('.get', () => {

        describe('Basics', () => {
            it('Should be a function', () => {
                mollieOne.customers.get.should.be.a.Function();
            });
        });

        describe('Errors', () => {
            it('An Object should be thrown', wrap(function* () {
                try {
                    yield mollieOne.customers.get();
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
                    yield mollieOne.customers.get();
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
                    const customer = yield mollieOne.customers.get(customer_id);
                    customer.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have basic properties', wrap(function* () {
                try {
                    const customer = yield mollieOne.customers.get(customer_id);

                    customer.should.have.property('id');
                    customer.should.have.property('name', name);
                    customer.should.have.property('email', email);
                    customer.should.have.property('recentlyUsedMethods');
                    customer.should.have.property('createdDatetime');
                    check = 1;
                    check = 1;
                } catch (error) {
                    console.log(error);
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
                mollieOne.customers.list.should.be.a.Function();
            });
        });

        describe('Errors', () => {
            it('Should throw an error if a count of more than 250 is given', wrap(function* () {
                try {
                    yield mollieOne.customers.list({count: 251});
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
                    const customers_list = yield mollieOne.customers.list({count: 15});
                    customers_list.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should return certain fields', wrap(function* () {
                try {
                    const customers_list = yield mollieOne.customers.list({count: 15});
                    customers_list.should.have.property('totalCount');
                    customers_list.should.have.property('offset');
                    customers_list.should.have.property('count');
                    customers_list.should.have.property('data');
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should work without parameters', wrap(function* () {
                try {
                    const customers_list = yield mollieOne.customers.list();

                    customers_list.should.have.property('totalCount');
                    customers_list.should.have.property('offset');
                    customers_list.should.have.property('count');
                    customers_list.should.have.property('data');

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
