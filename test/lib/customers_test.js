"use strict";
require('should');
const co = require('co');
const mollie = require('../../app');

describe('Customers', function () {
    const customers = mollie.customers;
    let check = 0;
    let customer_id = null;

    const name = 'GeeX';
    const email = 'development@geex.company';
    const metadata = {
        company_name: 'CreasolDevelopment',
        test: true
    };
    const locale = 'nl';

    beforeEach(function () {
        check = 0;
    });

    describe('.create', function () {

        describe('Basics', function () {
            it('Should be a function', function () {
                customers.create.should.be.a.Function();
            });
        });

        describe('Errors', function () {
            it('An Object should be thrown', co.wrap(function *() {
                try {
                    yield customers.create();
                    check = 1;
                } catch (error) {
                    error.should.be.an.Object();
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no name is given', co.wrap(function*() {
                try {
                    yield customers.create(null, email);
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'Not all required parameters are given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if no email is given', co.wrap(function*() {
                try {
                    yield customers.create(name, null);
                    check = 1;
                } catch (error) {
                    error.should.have.property('error', 'Not all required parameters are given');
                    check = 2;
                }
                check.should.equal(2);
            }));

            it('Should throw an error if a non-accepted locale is set', co.wrap(function *() {
                try {
                    yield customers.create(name, email, {locale: 'dutch'});
                    check = 1;
                } catch (error) {
                    error.should.have.property('error');
                    check = 2;
                }
                check.should.equal(2);
            }));
        });

        describe('Success', function () {
            it('Should return an Object', co.wrap(function *() {
                try {
                    const customer = yield customers.create(name, email);
                    customer.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have basic properties', co.wrap(function *() {
                try {
                    const customer = yield customers.create(name, email, {
                        locale: 'nl',
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

    describe('.get', function () {

        describe('Basics', function () {
            it('Should be a function', function () {
                customers.get.should.be.a.Function();
            });
        });

        describe('Errors', function () {
            it('An Object should be thrown', co.wrap(function *() {
                try {
                    yield customers.get();
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
                    yield customers.get();
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
                    const customer = yield customers.get(customer_id);
                    customer.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have basic properties', co.wrap(function *() {
                try {
                    const customer = yield customers.get(customer_id);

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

    describe('.list', function () {
        const offset = 2;
        const count = 'Mollie ES6 module Test';

        describe('Basics', function () {
            it('Should be a function', function () {
                customers.list.should.be.a.Function();
            });
        });

        describe('Errors', function () {
            it('Should throw an error if a count of more than 250 is given', co.wrap(function*() {
                try {
                    yield customers.list({count: 251});
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
                    const customers_list = yield customers.list({count: 15});
                    customers_list.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should return certain fields', co.wrap(function *() {
                try {
                    const customers_list = yield customers.list({count: 15});
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

            it('Should work without parameters', co.wrap(function *() {
                try {
                    const customers_list = yield customers.list();

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
