"use strict";
const {wrap} = require('co');
const Mollie = require('../../app');

describe('Methods', () => {
    let check = 0;
    let method_id = null;

    let mollieOne;
    let mollieTwo;
    let keys;

    before(() => {
        keys = require(`${process.env.TEST_DIR}/test_keys`) || null;
    });

    beforeEach(() => {
        check = 0;

        mollieOne = new Mollie(process.env.MOLLIE_KEY || keys[0].key);
        if (keys.length > 0)
            mollieTwo = new Mollie(keys[1].key)
    });

    describe('.list', () => {
        const offset = 0;

        describe('Basics', () => {
            it('Should be a function', () => {
                mollieOne.methods.list.should.be.a.Function();
            });
        });

        describe('Errors', () => {
            it('Should throw an error if a count of more than 250 is given', wrap(function* () {
                try {
                    yield mollieOne.methods.list({count: 251});
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
                    const method = yield mollieOne.methods.list({count: 15});
                    method.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should return certain fields', wrap(function* () {
                try {
                    const methods = yield mollieOne.methods.list({count: 15});
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

            it('Should return methods with method functions', wrap(function* () {
                try {
                    const methods = yield mollieOne.methods.list({count: 15});
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

    describe('.get', () => {

        describe('Basics', () => {
            it('Should be a function', () => {
                mollieOne.methods.get.should.be.a.Function();
            });
        });

        describe('Errors', () => {
            it('An Object should be thrown', wrap(function* () {
                try {
                    yield mollieOne.methods.get();
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
                    yield mollieOne.methods.get();
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
                    const method = yield mollieOne.methods.get(method_id);
                    method.should.be.an.Object();
                    check = 1;
                } catch (error) {
                    console.log(error);
                    check = 2;
                }
                check.should.equal(1);
            }));

            it('Should have basic properties', wrap(function* () {
                try {
                    const method = yield mollieOne.methods.get(method_id);

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

            it('Should have function getMinAmount which returns the minimal amount', wrap(function* () {
                try {
                    const method = yield mollieOne.methods.get(method_id);

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

            it('Should have function getMaxAmount which returns the maximal amount', wrap(function* () {
                try {
                    const method = yield mollieOne.methods.get(method_id);

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

            it('Should have function getImage which returns the image', wrap(function* () {
                try {
                    const method = yield mollieOne.methods.get(method_id);

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

            it('Should have function getBiggerImage which returns the bigger image', wrap(function* () {
                try {
                    const method = yield mollieOne.methods.get(method_id);

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
