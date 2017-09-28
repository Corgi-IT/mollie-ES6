"use strict";
require('should');
const {wrap} = require('co');
const Mollie = require('../app');

describe('Mollie Test', () => {

    let mollieOne;

    let keys;

    before(() => {
        process.env.TEST_DIR = __dirname;

        if (process.env.MOLLIE_KEY)
            keys = [{key: process.env.MOLLIE_KEY}];
        else
            keys = require(`${process.env.TEST_DIR}/test_keys`);
    });

    beforeEach(() => {
        mollieOne = new Mollie(keys[0].key);
    });

    describe('App', () => {
        it('Should be an Object', () => {
            mollieOne.should.be.an.Object();
        });

        it('Should have property payments', () => {
            mollieOne.should.have.property('payments');
            mollieOne.payments.should.be.an.Object();
        });

        it('Should throw an error if no API key is set', wrap(function* () {
            let check = 0;
            const mollie = new Mollie();

            try {
                yield mollie.request();
                check = 1;
            } catch (error) {
                error.should.have.property('error', 'There is no API key I can use, please set your key `this.key`');
                check = 2;
            }

            check.should.equal(2);
        }));

        describe('.test', () => {

            it('Should have a function test', () => {
                mollieOne.test.should.be.a.Function();
            });

            it('Should return true if the key is valid', wrap(function* () {
                const result = yield mollieOne.test();

                result.should.equal(true);
            }));

            it('Should return false if the key is invalid', wrap(function* () {
                const fakeKey = new Mollie('test_fake_key');

                const result = yield fakeKey.test();

                result.should.equal(false);
            }));

        })
    });
});
