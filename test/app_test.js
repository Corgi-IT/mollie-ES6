"use strict";
require('should');
const co = require('co');
const mollie = require('../app');
const request = require('../lib/request');

describe('Mollie Test', function () {

    before(function () {
        process.env.TEST_DIR = __dirname;
    });

    after(function () {
        mollie.api_key = require(`${process.env.TEST_DIR}/test_key`).key;
    });

    describe('App', function () {
        it('Should be an Object', function () {
            mollie.should.be.an.Object();
        });

        it('Should have property api_key, which is not set', function () {
            mollie.should.have.property('api_key', null);
        });

        it('Should have property payments', function () {
            mollie.should.have.property('payments');
            mollie.payments.should.be.an.Object();
        });

        it('Should throw an error if no API key is set', co.wrap(function *() {
            let check = 0;

            try {
                yield request();
                check = 1;
            } catch (error) {
                error.should.have.property('error', 'There is no API key I can use, please set your key `mollie.api_key`');
                check = 2;
            }

            check.should.equal(2);
        }));
    });
});
