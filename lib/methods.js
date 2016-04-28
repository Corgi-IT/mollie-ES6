const request = require('./request');
const {assign} = require('lodash');

const method_functions = {
    /**
     * Returns the minimum order amount for this Payment Method
     * @returns {Number} The minimum order amount
     */
    getMinAmount() {
        return this.amount.minimum;
    },

    /**
     * Returns the maximum order amount for this Payment Method
     * @returns {Number} The maximum order amount
     */
    getMaxAmount() {
        return this.amount.maximum;
    },

    /**
     * Returns the image url for this Payment Method (normal size)
     * @returns {String} The normal sized image url
     */
    getImage() {
        return this.image.normal;
    },

    /**
     * Returns the image url for this Payment Method (bigger size)
     * @returns {String} The bigger image url
     */
    getBiggerImage() {
        return this.image.bigger;
    }
};

/**
 * List all methods allowed by Mollie (for you API key)
 * @param {Object} options Extra options send to mollie
 * @returns {Object} Methods or error, as listed by Mollie
 */
function *list(options) {
    if (options.count && options.count > 250) {
        throw {error: 'Count larger than 250 is not allowed'};
    }

    const result = yield request(
        'GET',
        `methods`,
        null,
        options
    );

    if (result.error) {
        throw result;
    } else {
        readifyMethods(result.data);
        return result;
    }
}

/**
 * Get Method specific info
 * @param {String} id The method id as listed on the site or gotten through payments.list
 * @returns {Object} Method info or Error, as given by Mollie
 */
function *get(id) {
    if (!id) {
        throw {error: 'No id is given'};
    }

    const result = yield request(
        'GET',
        `methods/${id}`
    );

    if (result.error) {
        throw result;
    } else {
        readifyMethods(result);
        return result;
    }
}

function readifyMethods(method) {
    if (method.constructor === Object) {
        assign(method, method_functions);
    } else {
        for (let i = 0; i < method.length; i++) {
            assign(method[i], method_functions);
        }
    }
}

module.exports = {
    get,
    list
};
