const request = require('./request');
const {assign} = require('lodash');

/**
 * Creates a new customer
 * @param {Number} name The amount to be paid
 * @param {String} email description for the payment
 * @param {String} locale Locale accepted by Mollie
 * @param {Object} metadata Metadata for your customer
 * @returns {Object} New Customer or error, created by Mollie
 */
function *create(name, email, {locale, metadata} = {}) {
    if (!name || !email) {
        throw {error: 'Not all required parameters are given'};
    }

    const data = {
        name,
        email
    };

    if (locale) {
        const allowed_locale = ['de', 'en', 'es', 'fr', 'be', 'be-fr', 'nl'];

        if (allowed_locale.indexOf(locale) === -1) {
            throw {error: `Locale has a non-allowed value.\nAllowed values: ${allowed_locale.toString()}`};
        }

        assign(data, {locale});
    }

    if (metadata) {
        assign(data, {metadata});
    }

    const result = yield request(
        'POST',
        'customers',
        data
    );

    if (result.error) {
        throw result;
    } else {
        return result;
    }
}

/**
 * Get information about a customer from Mollie by it's id
 * @param {String} id The customers id
 * @returns {Object} Customers information or error, given by Mollie
 */
function *get(id) {
    if (!id) {
        throw {error: 'No id is given'};
    }

    const result = yield request(
        'GET',
        `customers/${id}`
    );

    if (result.error) {
        throw result;
    } else {
        return result;
    }
}

/**
 * Retrieves a list of customers from Mollie
 * @param {Object} options Options Mollie accepts for Customers.List
 * @returns {Array} List of customers along with some other data
 */
function *list(options) {
    if (options && options.count && options.count > 250) {
        throw {error: 'Count larger than 250 is not allowed'};
    }

    const result = yield request(
        'GET',
        'customers',
        null,
        options
    );

    if (result.error) {
        throw result;
    } else {
        return result;
    }
}

module.exports = {
    create,
    get,
    list
};
