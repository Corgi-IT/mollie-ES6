"use strict";
require('should');
const co = require('co');
const mollie = require('../../app');

describe('Issuers', function () {
    const issuers = mollie.issuers;
    let check = 0;
    let issuer_id = null;

    beforeEach(function () {
        check = 0;
    });

    describe('.list', function () {
        const offset = 0;

        describe('Basics', function () {
            it('Should be a function', function () {
                issuers.list.should.be.a.Function();
            });
        });

        describe('Errors', function () {
            it('Should throw an error if a count of more than 250 is given', co.wrap(function*() {
                try {
                    yield issuers.list({count: 251});
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
                    const issuers = yield mollie.issuers.list({count: 15});
                    issuers.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should return certain fields', co.wrap(function *() {
                try {
                    const issuers = yield mollie.issuers.list({count: 15});
                    issuers.should.have.property('totalCount');
                    issuers.should.have.property('offset');
                    issuers.should.have.property('count');
                    issuers.should.have.property('data');

                    issuer_id = issuers.data[0].id;
                    check = 1;
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
                issuers.get.should.be.a.Function();
            });
        });

        describe('Errors', function () {
            it('An Object should be thrown', co.wrap(function *() {
                try {
                    yield issuers.get();
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
                    yield issuers.get();
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
                    const issuer = yield mollie.issuers.get(issuer_id);
                    issuer.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have basic properties', co.wrap(function *() {
                try {
                    const issuer = yield mollie.issuers.get(issuer_id);

                    issuer.should.have.property('resource');
                    issuer.should.have.property('id');
                    issuer.should.have.property('name');
                    issuer.should.have.property('method');
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
