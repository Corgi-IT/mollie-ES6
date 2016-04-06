"use strict";
import should from 'should';
import mollie from '../app';

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
    });
});
