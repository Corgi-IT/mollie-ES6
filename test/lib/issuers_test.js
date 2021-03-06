"use strict";
const {wrap} = require('co');
const Mollie = require('../../app');

describe('Issuers', () => {
    let check = 0;
    let issuer_id = null;

    let mollieOne;
    let keys;

    before(() => {
        if (process.env.MOLLIE_KEY)
            keys = [{key: process.env.MOLLIE_KEY}];
        else
            keys = require(`${process.env.TEST_DIR}/test_keys`);
    });

    beforeEach(() => {
        check = 0;
        mollieOne = new Mollie(keys[0].key);
    });

    describe('.list', () => {
        const offset = 0;

        describe('Basics', () => {
            it('Should be a function', () => {
                mollieOne.issuers.list.should.be.a.Function();
            });
        });

        describe('Errors', () => {
            it('Should throw an error if a count of more than 250 is given', wrap(function* () {
                try {
                    yield mollieOne.issuers.list({count: 251});
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
                    const issuers = yield mollieOne.issuers.list({count: 15});
                    issuers.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should return certain fields', wrap(function* () {
                try {
                    const issuers = yield mollieOne.issuers.list({count: 15});
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

    describe('.get', () => {

        describe('Basics', () => {
            it('Should be a function', () => {
                mollieOne.issuers.get.should.be.a.Function();
            });
        });

        describe('Errors', () => {
            it('An Object should be thrown', wrap(function* () {
                try {
                    yield mollieOne.issuers.get();
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
                    yield mollieOne.issuers.get();
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
                    const issuer = yield mollieOne.issuers.get(issuer_id);
                    issuer.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have basic properties', wrap(function* () {
                try {
                    const issuer = yield mollieOne.issuers.get(issuer_id);

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
