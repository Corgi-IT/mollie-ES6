"use strict";
import should from 'should';
import co from 'co';
import mollie from '../../app';

describe('Methods', function () {
    const methods = mollie.methods;
    let check = 0;
    let method_id = null;

    beforeEach(function () {
        check = 0;
    });

    describe('.list', function () {
        const offset = 0;
        const count = 'Mollie ES6 module Test';

        describe('Basics', function () {
            it('Should be a function', function () {
                methods.list.should.be.a.Function();
            });
        });

        describe('Errors', function () {
            it('Should throw an error if a count of more than 250 is given', co.wrap(function*() {
                try {
                    yield methods.list({count: 251});
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
                    const method = yield mollie.methods.list({count: 15});
                    method.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should return certain fields', co.wrap(function *() {
                try {
                    const methods = yield mollie.methods.list({count: 15});
                    methods.should.have.property('totalCount');
                    methods.should.have.property('offset');
                    methods.should.have.property('count');
                    methods.should.have.property('data');

                    method_id = methods.data[0].id;
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should return methods with payment functions', co.wrap(function *() {
                try {
                    const methods = yield mollie.methods.list({count: 15});
                    const method = methods.data[0];

                    method.should.have.property('getMinAmount');
                    method.should.have.property('getMaxAmount');
                    method.should.have.property('getImage');
                    method.should.have.property('getBiggerImage');

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
                methods.get.should.be.a.Function();
            });
        });

        describe('Errors', function () {
            it('An Object should be thrown', co.wrap(function *() {
                try {
                    yield methods.get();
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
                    yield methods.get();
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
                    const method = yield mollie.methods.get(method_id);
                    method.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have basic properties', co.wrap(function *() {
                try {
                    const method = yield mollie.methods.get(method_id);

                    method.should.have.property('id');
                    method.should.have.property('description');
                    method.should.have.property('amount');
                    method.should.have.property('image');
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have function getMinAmount which returns the minimal amount', co.wrap(function *() {
                try {
                    const method = yield mollie.methods.get(method_id);

                    method.should.have.property('getMinAmount');
                    const amount = method.getMinAmount();
                    amount.should.equal(method.amount.minimum)
                    check = 1;
                } catch (error) {
                    console.log(error);
                    console.log(error.stack);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have function getMaxAmount which returns the maximal amount', co.wrap(function *() {
                try {
                    const method = yield mollie.methods.get(method_id);

                    method.should.have.property('getMaxAmount');
                    const amount = method.getMaxAmount();
                    amount.should.equal(method.amount.maximum);
                    check = 1;
                } catch (error) {
                    console.log(error);
                    console.log(error.stack);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have function getImage which returns the image', co.wrap(function *() {
                try {
                    const method = yield mollie.methods.get(method_id);

                    method.should.have.property('getImage');
                    const image = method.getImage();
                    image.should.be.a.String();
                    image.should.equal(method.image.normal);
                    check = 1;
                } catch (error) {
                    console.log(error);
                    console.log(error.stack);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have function getBiggerImage which returns the bigger image', co.wrap(function *() {
                try {
                    const method = yield mollie.methods.get(method_id);

                    method.should.have.property('getBiggerImage');
                    const image = method.getBiggerImage();
                    image.should.be.a.String();
                    image.should.equal(method.image.bigger);
                    check = 1;
                } catch (error) {
                    console.log(error);
                    console.log(error.stack);
                    check = 2;
                }
                check.should.equal(1);
            }));
        });
    });

});
